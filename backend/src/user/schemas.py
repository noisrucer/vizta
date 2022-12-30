from email_validator import validate_email, EmailNotValidError
from pydantic import BaseModel, Field, EmailStr, validator

import backend.src.course.schemas as course_schemas
import backend.src.user.enums as enums
import backend.src.utils as glob_utils
import backend.src.auth.exceptions as auth_exceptions

class UserBase(BaseModel):
    email: str
    entered_year: int = Field(default=..., ge=2000, le=glob_utils.get_current_year())
    major: enums.Major
    
    @validator('email')
    def email_must_be_valid(cls, v):
        try:
            validation = validate_email(v)
            email = validation.email
        except EmailNotValidError as e:
            raise auth_exceptions.EmailNotValidException()
        return email

class User(UserBase):
    class Config:
        orm_mode = True
        
class UserProfileOut(BaseModel):
    email: EmailStr
    major: enums.Major
    entered_year: int = Field(..., ge=2000, le=glob_utils.get_current_year())
    # favorites: list[]
    reviews: list[course_schemas.CourseReviewBase]
    
class UserFavoriteBase(BaseModel):
    email: EmailStr
    course_id: str = Field(..., regex="^[A-Z]{4}[0-9]{4}$")
        
class UserFavorite(UserFavoriteBase):
    class Config:
        orm_mode = True
    
    
class UserFavoriteCreate(UserFavoriteBase):
    class Config:
        orm_mode = True

class UserFavoriteCreateOut(UserFavoriteBase):
    class Config:
        orm_mode = True

    