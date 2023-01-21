from pydantic import BaseModel, Field, EmailStr

import backend.src.course.enums as enums
import backend.src.utils as glob_utils 
import backend.src.user.schemas as user_schemas


class CourseBase(BaseModel):
    course_id: str = Field(..., regex="^[a-zA-Z]{4}[0-9]{4}$")
    name: str
    
class MainPageCourseOut(CourseBase):
    num_reviews: int = Field(..., ge=0)
    is_favorite: bool
    has_reviewed: bool
    class Config:
        orm_mode = True
        

class UserFavoriteOut(CourseBase):
    num_reviews: int = Field(..., get=0)

class CourseReviewBase(BaseModel):
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


class CourseReviewCreateIn(CourseReviewBase):
    pass


class CourseReviewCreateOut(CourseReviewBase):
    review_id: int
    class Config:
        orm_mode = True