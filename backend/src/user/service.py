from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.course.models as course_models


def get_reviews_by_user_email(email: EmailStr, db: Session=Depends(get_db)):
    reviews = db.query(course_models.CourseReview).filter(course_models.CourseReview.email == email).all()
    return reviews

