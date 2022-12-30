from pydantic import BaseModel, Field, EmailStr

import backend.src.course.schemas as course_schemas
import backend.src.auth.enums as auth_enums
import backend.src.utils as glob_utils


class UserProfileOut(BaseModel):
    email: EmailStr
    major: auth_enums.Major
    entered_year: int = Field(..., ge=2000, le=glob_utils.get_current_year())
    # favorites: list[]
    reviews: list[course_schemas.CourseReviewBase]
    
    