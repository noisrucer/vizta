from datetime import timedelta

from fastapi import APIRouter, status, Depends, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.auth.schemas as schemas
import backend.src.auth.exceptions as exceptions
import backend.src.auth.service as service
import backend.src.auth.utils as utils
import backend.src.dependencies as glob_dependencies
import backend.src.utils as glob_utils
import backend.src.models as glob_models
import backend.src.user.exceptions as user_exceptions
import backend.src.user.service as user_service
from backend.src.auth.config import get_jwt_settings

jwt_settings = get_jwt_settings()

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserCreateOut)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user_dict = user.dict()
    
    if not service.verify_valid_hku_email(user_dict['email']):
        raise exceptions.EmailNotValidHKUEmailException()
        
    # Check if there's a duplicated email in the DB
    if service.get_user_by_email(db, email=user_dict['email']):
        raise exceptions.EmailAlreadyExistsException(email=user_dict['email'])
    
    # Hash password
    hashed_password = utils.hash_password(user_dict['password'])
    user_dict.update(password=hashed_password)

    # Save to DB
    new_user = glob_models.User(**user_dict)
    db.add(new_user) 
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.post('/register/verification', status_code=status.HTTP_200_OK)
async def verify_email(verification_info: schemas.VerifyEmail, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    verification_info = verification_info.dict()
    email = verification_info['email']

    # Check if email is HKU email (xxx@connect.hku.hk)
    if not service.verify_valid_hku_email(email):
        raise exceptions.EmailNotValidHKUEmailException()
        
    # Check if the email has been already registered
    if service.get_user_by_email(db, email=email):
        raise exceptions.EmailAlreadyExistsException(email=verification_info['email'])
    
    # Send verification code
    verification_code = utils.generate_verification_code(len=6)
    recipient = email
    subject="[Vizta] Please verify your email address"
    content = utils.read_html_content_and_replace(
        replacements={"__VERIFICATION_CODE__": verification_code},
        html_path="backend/src/email/verification.html"
    )
    background_tasks.add_task(glob_utils.send_email, recipient, content, subject)
    
    return {"status": "successful", "verification_token": verification_code}


@router.post('/login', response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
    ):
    user = service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise exceptions.InvalidEmailOrPasswordException()
        
    access_token_expires = timedelta(minutes=jwt_settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/reset-password/email/{email}')
async def send_reset_password_email(
    email: EmailStr,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    '''
    1) Accept user email
    2) Send an email with redirection link to "reset password" page -> API
    3) When user clicks on that link, redirect user to the page
    4) User enters new password / confirm password -> API
    /reset-password/jkbkjlhh
    '''
    user = service.get_user_by_email(db, email)
    if not user:
        raise user_exceptions.UserNotFoundException(email)
    
    pwd = service.get_password_by_email(db, email)
    reset_url = f"http://localhost:8000/auth/reset-password/{pwd}"
    recipient = email
    subject="[Vizta] Please reset your password"
    content = utils.read_html_content_and_replace(
        replacements={"__LINK__": reset_url},
        html_path="backend/src/email/reset_password.html"
    )
    background_tasks.add_task(glob_utils.send_email, recipient, content, subject)
    return {"hashed_password": pwd, "reset_url": reset_url}


@router.patch('/reset_password/{email}', status_code=status.HTTP_204_NO_CONTENT)
async def reset_password(email: EmailStr, update_info: schemas.ResetPasswordIn, db: Session=Depends(get_db)):
    update_info = update_info.dict()
    user = service.get_user_by_email(db, email)
    if not user:
        raise user_exceptions.UserNotFoundException(email)
    user_service.update_password(db, user, update_info['new_password'])
    
    
# Testing
@router.get("/me", dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_me():
    return {"message": "authenticated"}