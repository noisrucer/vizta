from random import randbytes
from datetime import datetime, timedelta
import hashlib

from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session 
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError

from ..database import get_db
from .. import models, schemas
from ..utils import hash_password, verify_password
from ..email import Email
from ..config import EmailEnvs, JWTEnvs
from ..oauth2 import create_access_token, decode_jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserCreateOut)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user_dict = user.dict()
    
    # Check if there's a duplicated email in the DB
    dup_email_entry = db.query(models.User).filter(models.User.email == user_dict['email']).first()
    if dup_email_entry:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already existed"
        )
    
    # Check if email is HKU email (xxx@connect.hku.hk)
    if user_dict['email'].split('@')[-1] != 'connect.hku.hk':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must provide a valid HKU email (@connect.hku.hk)"
        )
    
    # Hash password
    hashed_password = hash_password(user_dict['password'])
    user_dict.update(
        password=hashed_password
    )
    
    # Send verification code
    verification_token = randbytes(6)
    hashedCode = hashlib.sha256()
    hashedCode.update(verification_token)
    verification_code = hashedCode.hexdigest()
    user_dict.update(
        verification_code=verification_code
    )
    
    recipient = user_dict['email']
    subject="Hello from HKUviz"
    html= f"""<p>Verification Code: {verification_code}</p> """
    
    conf = ConnectionConfig(
            MAIL_USERNAME = EmailEnvs.MAIL_USERNAME,
            MAIL_PASSWORD = EmailEnvs.MAIL_PASSWORD,
            MAIL_FROM = EmailEnvs.MAIL_FROM,
            MAIL_PORT = EmailEnvs.MAIL_PORT,
            MAIL_SERVER = EmailEnvs.MAIL_HOST,
            MAIL_STARTTLS = True,
            MAIL_SSL_TLS = False,
            USE_CREDENTIALS = True,
            VALIDATE_CERTS = True
        )
    message = MessageSchema(
            subject=subject,
            recipients=[recipient],
            body=html,
            subtype=MessageType.html
        )
    # fm = FastMail(conf)
    # await fm.send_message(message)
    
    # Save to DB
    new_user = models.User(**user_dict)
    db.add(new_user) 
    db.commit()
    db.refresh(new_user)
    return new_user
    
@router.post('/register/verification', status_code=status.HTTP_200_OK)
async def verify_email(verificationInfo: schemas.VerifyEmail, db: Session = Depends(get_db)):
    verificationInfo = verificationInfo.dict()
    email, verification_code = verificationInfo['email'], verificationInfo['verification_code']
    matched_user_query = db.query(models.User).filter(models.User.email == email)
    matched_user = matched_user_query.first()
    if not matched_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found")
    
    if matched_user.verification_code != verification_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Verification code not matched")
    
    matched_user_query.update({
        'verified': True
        })
    
    db.commit()
    
    return {"status": "successful", "message": "Email verified"}
    
    
def authenticate_user(email: str, password: str, db: Session = Depends(get_db)):
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