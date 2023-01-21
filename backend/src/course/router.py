from fastapi import APIRouter, status, Depends, Path
from sqlalchemy.orm import Session
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.course.service as service
import backend.src.course.schemas as schemas
import backend.src.course.models as models
import backend.src.course.enums as enums
import backend.src.course.exceptions as exceptions
import backend.src.auth.service as auth_service
import backend.src.user.schemas as user_schemas
import backend.src.user.models as user_models

import backend.src.dependencies as glob_dependencies
import backend.src.exceptions as glob_exceptions
import backend.src.utils as glob_utils


router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)


@router.post(
    '/favorite',
    status_code=status.HTTP_201_CREATED,
    response_model=user_schemas.UserFavoriteCreateOut,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def create_user_favorite(user_favorite: user_schemas.UserFavoriteCreate, db: Session = Depends(get_db)):
    user_fav_dict = user_favorite.dict()
    email, course_id = user_fav_dict['email'], user_fav_dict['course_id']

    # check if email exists in DB
    user = auth_service.get_user_by_email(db, email)
    if not user:
        raise glob_exceptions.EmailNotExistException(email)

    # check if course_id exists in DB
    course = service.get_course_by_course_id(db, course_id)
    if not course:
        raise exceptions.CourseNotExistException(course_id)

    # check if user_id has already added course_id
    dup_user_favorite = service.check_exist_user_favorite_course(db, email, course_id)

    if dup_user_favorite:
        raise exceptions.UserFavoriteCourseAlreadyExistsException(email, course_id)

    new_user_fav = user_models.UserFavorite(**user_fav_dict)
    db.add(new_user_fav)
    db.commit()
    db.refresh(new_user_fav)
    return new_user_fav


@router.delete(
    '/favorite/{email}/{course_id}',
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def delete_user_favorite(
    email: EmailStr,
    course_id: str,
    db: Session=Depends(get_db)
):
    fav = service.check_exist_user_favorite_course(db, email, course_id)
    if not fav:
        raise exceptions.UserFavoriteNotExitException(email, course_id)
    deleted_favorite = service.delete_user_favorite(db, email, course_id)


@router.get(
    '/favorites/{email}',
    response_model=list[schemas.MainPageCourseOut],
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_user_favorites(email: EmailStr, db: Session=Depends(get_db)):
    favorites = service.get_user_favorite_courses_by_email(db, email)
    return favorites

@router.get(
    '/subclasses/{course_id}',
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_subclass_list(course_id: str, academic_year: int, semester: int, db: Session=Depends(get_db)):
    subclasses = service.get_subclass_list(db, course_id, academic_year, semester)
    return subclasses


@router.post(
    '/review',
    response_model = schemas.CourseReviewCreateOut,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def create_review(review: schemas.CourseReviewBase, db: Session=Depends(get_db)):
    review = review.dict()
    review_subclass_items = glob_utils.extract_sub_dict(
        review, ['course_id', 'subclass_id', 'academic_year', 'semester']
    )

    for key, val in review.items():
        if isinstance(val, enums.NumericEval):
            review[key] = val.value

    # check if email exists in DB
    user = auth_service.get_user_by_email(db, review['email'])
    if not user:
        raise glob_exceptions.EmailNotExistException(review['email'])

    # check if subclass exists in DB
    subclass = service.get_subclass(db, **review_subclass_items)
    if not subclass:
        raise exceptions.SubclassNotExistException(**review_subclass_items)

    # check if user_id already left a review for subclass
    user_review = service.get_user_review(db, review['email'], **review_subclass_items)
    if user_review:
         raise exceptions.UserAlreadyReviewedCourseException(review['email'], **review_subclass_items)

    new_review = models.CourseReview(**review)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    # update grading ratio
    new_ratio = service.get_majority_ratio(db, **{**review_subclass_items, 'min_count': 5})
    if len(new_ratio) != 0:
        new_ratio = new_ratio[0]
        service.update_grading_ratio(db, **{**review_subclass_items,
                                            'final_exam_ratio': new_ratio[0],
                                            'midterm_ratio': new_ratio[1],
                                            'assignments_ratio': new_ratio[2],
                                            'project_ratio': new_ratio[3]})

    return new_review


# GET /courses/{faculty}/{user_email}
@router.get(
    '/{faculty}/{email}',
    response_model=list[schemas.MainPageCourseOut],
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_courses(faculty: enums.Faculty, email: EmailStr, db: Session=Depends(get_db)):
    courses = service.get_courses_by_faculty(db, faculty)
    response = []
    for c in courses:
        cid = c.course_id
        cname = c.name
        reviews = service.get_reviews_by_course_id(db, cid)
        num_reviews = len(reviews)
        is_favorite =  True if service.check_exist_user_favorite_course(db, email, cid) else False
        has_reviewed = True if service.check_has_reviewed(db, email, cid) else False
        response.append({
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews,
            "is_favorite": is_favorite,
            "has_reviewed": has_reviewed
        })

    return response