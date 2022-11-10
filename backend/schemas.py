from typing import Union

from pydantic import BaseModel, EmailStr

# Users
class UserBase(BaseModel):
    email: EmailStr
    
class UserCreate(UserBase):
    password: str
    
class UserCreateOut(UserBase):
    user_id: int
    
    class Config:
        orm_mode = True
    
class User(UserBase):
    class Config:
        orm_mode = True

# Email
class EmailSchema(BaseModel):
    email: list[EmailStr]