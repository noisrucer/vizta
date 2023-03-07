from fastapi import Depends
from sqlalchemy.orm import Session 
from pydantic import EmailStr
from email_validator import validate_email, EmailNotValidError

from backend.src.database import get_db
import backend.src.models as glob_models
import backend.src.auth.exceptions as exceptions
import backend.src.auth.utils as utils


def get_user_by_email(db: Session, email: EmailStr):
    user = db.query(glob_models.User).filter(glob_models.User.email == email).first()
    return user


def get_password_by_email(db: Session, email: EmailStr):
    user = db.query(glob_models.User).filter(glob_models.User.email == email).first()
    print(user.password)
    return user.password


def verify_valid_hku_email(email: EmailStr):
    return email.split('@')[-1] == 'connect.hku.hk'


def authenticate_user(db: Session, email: str, password: str):
    try:
        validation = validate_email(email)
        email = validation.email
    except EmailNotValidError as e:
        raise exceptions.EmailNotValidException()
    
    user = db.query(glob_models.User).filter(glob_models.User.email == email).first()
    if not user:
        return False
    if not utils.verify_password(password, user.password):
        return False
    return user
    
    