from typing import Union
from enum import Enum

from email_validator import validate_email, EmailNotValidError
from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr, validator, root_validator

class Major(str, Enum):
    comp_sci = "Computer Science"
    comp_eng = "Computer Engineering"
    info_sys = "Information System"
    other = "Other"
    
# Users
class UserBase(BaseModel):
    email: str
    enteredYear: int
    major: Major
    
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
    
    
# Course
class CourseBase(BaseModel):
    course_id: str
    name: str
    
    
class MainPageCourseOut(CourseBase):
    num_reviews: int
    
    class Config:
        orm_mode = True
        
class Faculty(str, Enum):
    all = "All"
    beng = "BEng"
    bba = "BBA"
    bsc = "BSC"
    cc = "CC"
    
    
class UserFavoriteBase(BaseModel):
    user_id: int
    course_id: str
        

class UserFavorite(UserFavoriteBase):
    class Config:
        orm_mode = True
        
class UserFavoriteCreate(UserFavoriteBase):
    class Config:
        orm_mode = True

class UserFavoriteCreateOut(UserFavoriteBase):
    class Config:
        orm_mode = True
        
class NumericEval(int, Enum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5
    six = 6
    seven = 7
    eight = 8
    nine = 9
    ten = 10
    
class GPA(str, Enum):
    aplus = "A+"
    a = "A"
    aminus = "A-"
    bplus = "B+"
    b = "B"
    bminus = "B-"
    cplus = "C+"
    c = "C"
    cminus = "C-"
    dplus = "D+"
    d = "D"
    fail = "F"

class UserReviewBase(BaseModel):
    user_id: int
    course_id: str
    subclass_id: str
    academic_year: int
    semester: int
    gpa: GPA
    workload: NumericEval
    lecture_difficulty: NumericEval
    final_exam_difficulty: NumericEval
    course_entertaining: NumericEval
    course_delivery: NumericEval
    course_interactivity: NumericEval
    final_exam_ratio: int
    midterm_ratio: int
    assignments_ratio: int
    project_ratio: int

class UserReviewCreateIn(UserReviewBase):
    pass
class UserReviewCreateOut(UserReviewBase):
    review_id: int
    class Config:
        orm_mode = True