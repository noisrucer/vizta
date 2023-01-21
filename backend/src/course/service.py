from fastapi import Depends, Path
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_, func
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.course.enums as enums
import backend.src.course.models as models
import backend.src.user.models as user_models
import backend.src.utils as glob_utils


def get_course_by_course_id(db:Session, course_id: str):
    course = db.query(models.Course).filter(models.Course.course_id == course_id).first()
    return course


def get_courses_by_faculty(db: Session, faculty: enums.Faculty):
    if faculty is enums.Faculty.all:
        courses = db.query(models.Course).all()
    else:
        courses = db.query(models.Course).filter(models.Course.faculty == faculty).all()

    return courses


def get_reviews_by_course_id(db:Session, course_id: str):
    reviews = db.query(models.CourseReview).filter(models.CourseReview.course_id == course_id).all()
    return reviews


def get_reviews_by_user_email(db:Session, email: EmailStr):
    reviews = db.query(models.CourseReview).filter(models.CourseReview.email == email).all()
    return reviews


def check_exist_user_favorite_course(db: Session, email: EmailStr, course_id: str):
    user_favorite_course = db.query(user_models.UserFavorite).filter(
        user_models.UserFavorite.email == email
        ).filter(
            and_(
                user_models.UserFavorite.email == email,
                user_models.UserFavorite.course_id == course_id
            )
        ).first()

    return user_favorite_course


def get_user_favorite_courses_by_email(db: Session, email: EmailStr):
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
        filter(user_models.UserFavorite.course_id == models.Course.course_id).\
        filter(user_models.UserFavorite.email == email).\
        all()
    response = []
    for fav in favorites:
        user_favorite, course = glob_utils.sql_obj_list_to_dict_list(list(fav))
        cid = user_favorite['course_id']
        cname = course['name']
        num_reviews = len(get_reviews_by_course_id(db, cid))
        response.append({
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews,
            "is_favorite": True
        })
    return response


def delete_user_favorite(db: Session, email: EmailStr, course_id: str):
    favorite = db.query(user_models.UserFavorite).\
        filter(user_models.UserFavorite.email == email).\
        filter(user_models.UserFavorite.course_id == course_id).first()
    db.delete(favorite)
    db.commit()
    return favorite


def check_has_reviewed(db: Session, email: EmailStr, course_id: str):
    reviews = db.query(models.CourseReview).\
                filter(models.CourseReview.email == email).\
                filter(models.CourseReview.course_id == course_id).all()
    
    return reviews


def get_subclass(
    db: Session,
    course_id: str,
    subclass_id: str,
    academic_year: int,
    semester: int
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

def get_subclass_list(
        db: Session,
        course_id: str,
        academic_year: int,
        semester: int
):
    subclasses = db.query(models.Subclass).filter(
        and_(
            models.Subclass.course_id == course_id,
            models.Subclass.academic_year == academic_year,
            models.Subclass.semester == semester
        )
    ).all()

    return subclasses

def get_user_review(
    db: Session,
    email: str,
    course_id: str,
    subclass_id: str,
    academic_year: int,
    semester: int
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


def get_majority_ratio(db: Session,
                       subclass_id: str,
                       course_id: str,
                       academic_year: int,
                       semester: int,
                       min_count: int):
    formation = [models.CourseReview.final_exam_ratio,
                 models.CourseReview.midterm_ratio,
                 models.CourseReview.assignments_ratio,
                 models.CourseReview.project_ratio]

    return db.query(*formation, func.count(formation[0])). \
        filter(models.CourseReview.subclass_id == subclass_id,
               models.CourseReview.course_id == course_id,
               models.CourseReview.academic_year == academic_year,
               models.CourseReview.semester == semester). \
        group_by(*formation). \
        having(func.count(formation[0]) >= min_count). \
        limit(1). \
        all()


def update_grading_ratio(db: Session,
                         subclass_id: str,
                         course_id: str,
                         academic_year: int,
                         semester: int,
                         final_exam_ratio: int,
                         midterm_ratio: int,
                         assignments_ratio: int,
                         project_ratio: int):
    db.query(models.Subclass). \
        filter(models.Subclass.subclass_id == subclass_id,
               models.Subclass.course_id == course_id,
               models.Subclass.academic_year == academic_year,
               models.Subclass.semester == semester). \
        update({'final_exam_ratio': final_exam_ratio,
                'midterm_ratio': midterm_ratio,
                'assignments_ratio': assignments_ratio,
                'project_ratio': project_ratio})
    db.commit()
