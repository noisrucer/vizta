from pydantic import BaseModel, Field, EmailStr

import backend.src.courses.enums as enums
import backend.src.utils as glob_utils 


class CourseBase(BaseModel):
    course_id: str = Field(..., regex="^[a-zA-Z]{4}[0-9]{4}$")
    name: str

    
class MainPageCourseOut(CourseBase):
    num_reviews: int = Field(..., ge=0)
    class Config:
        orm_mode = True
    
    
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
    

class UserReviewBase(BaseModel):
    email: EmailStr
    course_id: str = Field(..., regex="^[A-Z]{4}[0-9]{4}$")
    subclass_id: str = Field(..., regex="^[A-Z]{1}$")
    academic_year: int = Field(..., ge=2000, le=glob_utils.get_current_year())
    semester: int = Field(..., ge=1, le=2)
    gpa: enums.GPA
    workload: enums.NumericEval
    lecture_difficulty: enums.NumericEval
    final_exam_difficulty: enums.NumericEval
    course_entertaining: enums.NumericEval
    course_delivery: enums.NumericEval
    course_interactivity: enums.NumericEval
    final_exam_ratio: int = Field(..., ge=0, le=100)
    midterm_ratio: int = Field(..., ge=0, le=100)
    assignments_ratio: int = Field(..., ge=0, le=100)
    project_ratio: int = Field(..., ge=0, le=100)


class UserReviewCreateIn(UserReviewBase):
    pass


class UserReviewCreateOut(UserReviewBase):
    review_id: int
    class Config:
        orm_mode = True