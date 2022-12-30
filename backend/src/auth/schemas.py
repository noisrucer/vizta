from typing import Union
import datetime

from fastapi import HTTPException, status
from email_validator import validate_email, EmailNotValidError
from pydantic import BaseModel, validator, Field

import backend.src.auth.exceptions as exceptions
import backend.src.auth.enums as enums
import backend.src.utils as utils
    
    
class UserBase(BaseModel):
    email: str
    entered_year: int = Field(default=..., ge=2000, le=utils.get_current_year())
    major: enums.Major
    
    @validator('email')
    def email_must_be_valid(cls, v):
        try:
            validation = validate_email(v)
            email = validation.email
        except EmailNotValidError as e:
            raise exceptions.EmailNotValidException()
        return email
    

class UserCreate(UserBase):
    password: str = Field(default=..., min_length=4, max_length=30)
    
    
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
            raise exceptions.EmailNotValidException()
        return email
    
    
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None