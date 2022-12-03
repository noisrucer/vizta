from typing import Union
from enum import Enum

from email_validator import validate_email, EmailNotValidError
from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr, validator

class Major(str, Enum):
    comp_sci = "Computer Science"
    comp_eng = "Computer Engineering"
    info_sys = "Information System"
    other = "Other"
    
# Users
class UserBase(BaseModel):
    email: str
    enteredYear: str
    major: str
    
    @validator('email')
    def email_must_be_valid(cls, v):
        try:
            validation = validate_email(v)
            email = validation.email
        except EmailNotValidError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You must provide a valid email address type (ex. xxx@gmail.com)"
            )
        return email
        
    
class UserCreate(UserBase):
    password: str
    
class UserCreateOut(UserBase):
    user_id: int
    
    class Config:
        orm_mode = True
    
class User(UserBase):
    class Config:
        orm_mode = True
        
class VerifyEmail(BaseModel):
    email: str
    
    @validator('email')
    def email_must_be_valid(cls, v):
        try:
            validation = validate_email(v)
            email = validation.email
        except EmailNotValidError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You must provide a valid email address type (ex. xxx@gmail.com)"
            )
        return email
    

# Email
class EmailSchema(BaseModel):
    email: list[EmailStr]
    
    
# JWT
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None