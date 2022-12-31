from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.course.enums as enums
import backend.src.course.models as models
import backend.src.user.models as user_models
import backend.src.utils as glob_utils


def get_course_by_course_id(course_id: str, db: Session=Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    return course


def get_courses_by_faculty(faculty: enums.Faculty, db: Session=Depends(get_db)):
    if faculty is enums.Faculty.all:
        courses = db.query(models.Course).all()
    else:
        courses = db.query(models.Course).filter(models.Course.faculty == faculty).all()
        
    return courses
    
    
def get_reviews_by_course_id(course_id: str, db: Session=Depends(get_db)):
    reviews = db.query(models.CourseReview).filter(models.CourseReview.course_id == course_id).all()
    return reviews


def get_reviews_by_user_email(email: EmailStr, db: Session=Depends(get_db)):
    reviews = db.query(models.CourseReview).filter(models.CourseReview.email == email).all()
    return reviews


def check_exist_user_favorite_course(email: EmailStr, course_id: str, db: Session=Depends(get_db)):
    user_favorite_course = db.query(user_models.UserFavorite).filter(
        user_models.UserFavorite.email == email
        ).filter(
            and_(
                user_models.UserFavorite.email == email,
                user_models.UserFavorite.course_id == course_id
            )
        ).first()
        
    return user_favorite_course


def get_user_favorite_courses_by_email(email: EmailStr, db: Session=Depends(get_db)):
    """Return user favorite courses by user email

    Args:
        email (EmailStr): user email
        db (Session): Defaults to Depends(get_db).

    Returns:
        list[dict]: {
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews
        }
    """
    favorites = db.query(user_models.UserFavorite, models.Course).\
        filter(user_models.UserFavorite.course_id == models.Course.course_id).all()
    response = []
    for fav in favorites:
        user_favorite, course = glob_utils.sql_obj_list_to_dict_list(list(fav))
        cid = user_favorite['course_id']
        cname = course['name']
        num_reviews = len(get_reviews_by_course_id(cid, db))
        response.append({
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews
        })
    return response


def get_subclass(
    course_id: str,
    subclass_id: str,
    academic_year: int,
    semester: int,
    db: Session=Depends(get_db)
):
    subclass = db.query(models.Subclass).filter(
        and_(
            models.Subclass.course_id == course_id,
            models.Subclass.subclass_id == subclass_id,
            models.Subclass.academic_year == academic_year,
            models.Subclass.semester == semester
        )
    ).first()
    
    return subclass


def get_user_review(
    email: str,
    course_id: str,
    subclass_id: str,
    academic_year: int,
    semester: int,
    db: Session=Depends(get_db)
):
    user_review = db.query(models.CourseReview).filter(
        and_(
            models.CourseReview.email == email,
            models.CourseReview.subclass_id == subclass_id,
            models.CourseReview.course_id == course_id,
            models.CourseReview.academic_year == academic_year,
            models.CourseReview.semester == semester
        )
    ).first()
    
    return user_review
    

