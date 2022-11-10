from random import randbytes
import hashlib

from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session 
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType

from ..database import get_db
from .. import models, schemas
from ..utils import hash_password
from ..email import Email
from ..envs import EmailEnvs

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
    verification_token = randbytes(15)
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
    fm = FastMail(conf)
    await fm.send_message(message)
    
    
    # Save to DB
    new_user = models.User(**user_dict)
    db.add(new_user) 
    db.commit()
    db.refresh(new_user)
    return new_user
    