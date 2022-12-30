from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.course.service as service
import backend.src.course.schemas as schemas
import backend.src.course.models as models
import backend.src.course.enums as enums
import backend.src.course.exceptions as exceptions
import backend.src.auth.service as auth_service

import backend.src.dependencies as glob_dependencies
import backend.src.exceptions as glob_exceptions
import backend.src.utils as glob_utils


router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)


@router.get(
    '/{faculty}',
    response_model=list[schemas.MainPageCourseOut],
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_courses(faculty: enums.Faculty, db: Session=Depends(get_db)):
    courses = service.get_courses_by_faculty(faculty, db)
    response = []
    for c in courses:
        cid = c.course_id
        cname = c.name
        reviews = service.get_reviews_by_course_id(cid, db)
        num_reviews = len(reviews)
        response.append({
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews
        })
        
    return response


@router.post(
    '/favorite',
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserFavoriteCreateOut,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def create_user_favorite(user_favorite: schemas.UserFavoriteCreate, db: Session = Depends(get_db)):
    user_fav_dict = user_favorite.dict()
    email, course_id = user_fav_dict['email'], user_fav_dict['course_id']
    
    # check if email exists in DB
    user = auth_service.get_user_by_email(email, db)
    if not user:
        raise glob_exceptions.EmailNotExistException(email)
    
    # check if course_id exists in DB
    course = service.get_course_by_course_id(course_id, db)
    if not course:
        raise exceptions.CourseNotExistException(course_id)
    
    # check if user_id has already added course_id
    dup_user_favorite = service.check_exist_user_favorite_course(email, course_id, db)
    
    if dup_user_favorite:
        raise exceptions.UserFavoriteCourseAlreadyExistsException(email, course_id)
        
    new_user_fav = models.UserFavorite(**user_fav_dict)
    db.add(new_user_fav)
    db.commit()
    db.refresh(new_user_fav)
    return new_user_fav


@router.get(
    '/favorites/{email}',
    response_model=list[schemas.UserFavorite],
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_user_favorites(email: EmailStr, db: Session=Depends(get_db)):
    return service.get_user_favorite_courses_by_email(email, db)


@router.get(
    '/reviews/{email}',
    response_model=list[schemas.CourseReviewBase],
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_reviews_by_user_email(email: EmailStr, db: Session=Depends(get_db)):
    reviews = service.get_reviews_by_user_email(email, db)
    reviews_dict_list = glob_utils.sql_obj_list_to_dict_list(reviews)
    return reviews_dict_list


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
    user = auth_service.get_user_by_email(review['email'], db=db)
    if not user:
        raise glob_exceptions.EmailNotExistException(review['email'])
        
    # check if subclass exists in DB
    subclass = service.get_subclass(**review_subclass_items, db=db)
    if not subclass:
        raise exceptions.SubclassNotExistException(**review_subclass_items)
    
    # check if user_id already left a review for subclass
    user_review = service.get_user_review(review['email'], **review_subclass_items, db=db)
    if user_review:
         raise exceptions.UserAlreadyReviewedCourseException(review['email'], **review_subclass_items)
         
    new_review = models.CourseReview(**review)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review
