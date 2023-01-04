from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.auth.utils as auth_utils
import backend.src.course.models as course_models
import backend.src.models as glob_models


def get_reviews_by_user_email(db: Session, email: EmailStr):
    reviews = db.query(course_models.CourseReview).filter(course_models.CourseReview.email == email).all()
    return reviews

def update_password(db: Session, user: glob_models.User, new_password: str):
    hashed_new_password = auth_utils.hash_password(new_password)
    setattr(user, "password", hashed_new_password)
    db.commit()

