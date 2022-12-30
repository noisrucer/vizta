from datetime import timedelta

from fastapi import APIRouter, status, Depends, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.src.database import get_db
import backend.src.auth.schemas as schemas
import backend.src.auth.exceptions as exceptions
import backend.src.auth.service as service
import backend.src.auth.utils as utils
import backend.src.dependencies as glob_dependencies
import backend.src.utils as glob_utils
import backend.src.models as glob_models
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
    if service.get_user_by_email(email=user_dict['email'], db=db):
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
    if service.get_user_by_email(email=email, db=db):
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
    user = service.authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise exceptions.InvalidEmailOrPasswordException()
        
    access_token_expires = timedelta(minutes=jwt_settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = utils.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
    
    
# Testing
@router.get("/me", dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_me():
    return {"message": "authenticated"}