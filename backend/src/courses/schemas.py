from pydantic import BaseModel, EmailStr
from typing import Union

import backend.src.courses.enums as enums

class CourseBase(BaseModel):
    course_id: str
    name: str
    
class MainPageCourseOut(CourseBase):
    num_reviews: int
    class Config:
        orm_mode = True
    
    
class UserFavoriteBase(BaseModel):
    email: EmailStr
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
    

class UserReviewBase(BaseModel):
    email: EmailStr
    course_id: str
    subclass_id: str
    academic_year: int
    semester: int
    gpa: enums.GPA
    workload: enums.NumericEval
    lecture_difficulty: enums.NumericEval
    final_exam_difficulty: enums.NumericEval
    course_entertaining: enums.NumericEval
    course_delivery: enums.NumericEval
    course_interactivity: enums.NumericEval
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