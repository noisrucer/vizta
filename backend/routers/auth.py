import random
from random import randbytes
import string
import secrets
from datetime import datetime, timedelta
import hashlib

from fastapi import APIRouter, status, HTTPException, Depends
from email_validator import validate_email, EmailNotValidError
from sqlalchemy.orm import Session 
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError

from ..database import get_db
from .. import models, schemas
from ..utils import hash_password, verify_password
from ..config import EmailEnvs, JWTEnvs
from ..oauth2 import create_access_token, decode_jwt
from backend.email.email import email_sender
from ..config import JWTEnvs

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scheme_name="JWT",
    )

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

    
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserCreateOut)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user_dict = user.dict()
    
    # Check if email is HKU email (xxx@connect.hku.hk)
    if user_dict['email'].split('@')[-1] != 'connect.hku.hk':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must provide a valid HKU email (@connect.hku.hk)"
        )
        
    # Check if there's a duplicated email in the DB
    dup_email_entry = db.query(models.User).filter(models.User.email == user_dict['email']).first()
    if dup_email_entry:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already existed"
        )
    
    # Hash password
    hashed_password = hash_password(user_dict['password'])
    user_dict.update(
        password=hashed_password
    )
    
    # Save to DB
    new_user = models.User(**user_dict)
    db.add(new_user) 
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post('/register/verification', status_code=status.HTTP_200_OK)
async def verify_email(verificationInfo: schemas.VerifyEmail, db: Session = Depends(get_db)):
    verificationInfo = verificationInfo.dict()
    email = verificationInfo['email']

    # Check if email is HKU email (xxx@connect.hku.hk)
    if email.split('@')[-1] != 'connect.hku.hk':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must provide a valid HKU email (@connect.hku.hk)"
        )
        
    # Check if the email has been already registered
    matched_user_query = db.query(models.User).filter(models.User.email == email)
    matched_user = matched_user_query.first()
    if matched_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="This email has been already registered.")
    
    # Send verification code
    # verification_token = randbytes(1)
    # print(verification_token)
    # hashedCode = hashlib.sha256()
    # print(hashedCode)
    # hashedCode.update(verification_token)
    # verification_code = hashedCode.hexdigest()
    verification_code_len = 6
    verification_code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(verification_code_len))

    recipient = email
    subject="[Vizta] Please verify your email address"
    f = open("backend/email/verification.html")
    content = f.read()
    content = content.replace("__VERIFICATION_CODE__", verification_code)
    
    email_sender.send_email(recipient, content, subject)
    
    return {"status": "successful", "verification_token": verification_code}
    
    
def authenticate_user(email: str, password: str, db: Session = Depends(get_db)):
    try:
        validation = validate_email(email)
        email = validation.email
    except EmailNotValidError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must provide a valid email address type (ex. xxx@gmail.com)"
        )

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return False
    return user


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    print("token: {}".format(token))
    try:
        user_email = decode_jwt(token)
        if user_email is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=user_email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(email=token_data.username, db=db)
    if user is None:
        raise credentials_exception
    return user
    
    
# Testing
@router.get("/me", response_model=schemas.User)
async def get_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user
    
    
@router.post('/login', response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
    ):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    access_token_expires = timedelta(minutes=JWTEnvs.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}