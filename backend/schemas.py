from typing import Union

from pydantic import BaseModel, EmailStr

# Users
class UserBase(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    
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
    email: EmailStr
    verification_code: str

# Email
class EmailSchema(BaseModel):
    email: list[EmailStr]
    
    
# JWT
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None