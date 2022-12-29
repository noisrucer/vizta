from ..src import models
from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_

from ..src.database import get_db
from .. import schemas

router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)

@router.get('/{faculty}', response_model = list[schemas.MainPageCourseOut])
async def get_users(faculty: schemas.Faculty, db: Session=Depends(get_db)):
    # If faculty is all
    if faculty == 'All':
        courses = db.query(models.Course).all()
    else: # If faculty is a specific faculty
        courses = db.query(models.Course).filter(models.Course.faculty == faculty).all()
        
    response = []
    for c in courses:
        cid = c.course_id
        cname = c.name
        reviews = db.query(models.CourseReview).filter(models.CourseReview.course_id == cid).all()
        num_reviews = len(reviews)
        response.append({
            "course_id": cid,
            "name": cname,
            "num_reviews": num_reviews
        })
        
    return response

@router.post('/favorites', status_code=status.HTTP_201_CREATED, response_model=schemas.UserFavoriteCreateOut)
async def create_user_favorite(user_favorite: schemas.UserFavoriteCreate, db: Session = Depends(get_db)):
    user_fav_dict = user_favorite.dict()
    
    # check if user_id exists in DB
    user = db.query(models.User).filter(models.User.email == user_fav_dict['email']).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {user_fav_dict['email']} does not exist in database."
        )
    
    # check if course_id exists in DB
    course = db.query(models.Course).filter(models.Course.course_id == user_fav_dict['course_id']).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Course {user_fav_dict['course_id']} does not exist in database."
        )
    
    # check if user_id has already added course_id
    dup_user_favorite = db.query(models.UserFavorite).filter(
        models.UserFavorite.email == user_fav_dict['email']
        ).filter(
            models.UserFavorite.course_id == user_fav_dict['course_id']
        ).first()
    
    if dup_user_favorite:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {user_fav_dict['user_id']} has already added {user_fav_dict['course_id']} as a favorite."
        )
        
    new_user_fav = models.UserFavorite(**user_fav_dict)
    db.add(new_user_fav)
    db.commit()
    db.refresh(new_user_fav)
    return new_user_fav


@router.get('/favorites/{email}', response_model = list[schemas.UserFavorite])
async def get_user_favorites(email: EmailStr, db: Session=Depends(get_db)):
    favorites = db.query(models.UserFavorite).filter(models.UserFavorite.email == email).all()
    return favorites


@router.post('/review', response_model = schemas.UserReviewCreateOut)
async def create_review(review: schemas.UserReviewBase, db: Session=Depends(get_db)):
    review = review.dict()
    for key, val in review.items():
        if isinstance(val, schemas.NumericEval):
            review[key] = val.value
            
    # check if user_id exists in DB
    user = db.query(models.User).filter(models.User.email == review['email']).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {review['email']} doesn't exist in database."
        )
        
    # check if subclass exists in DB
    subclass = db.query(models.Subclass).filter(
        and_(
            models.Subclass.course_id == review['course_id'],
            models.Subclass.subclass_id == review['subclass_id'],
            models.Subclass.academic_year == review['academic_year'],
            models.Subclass.semester == review['semester']
        )
    ).first()
    
    if not subclass:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Course {review['course_id']}{review['subclass_id']} / Year {review['academic_year']} / Semester {review['semester']} doesn't exist in database."
        )
    
    # check if user_id already left a review for subclass
    user_review = db.query(models.CourseReview).filter(
        and_(
            models.CourseReview.email == review['email'],
            models.CourseReview.subclass_id == review['subclass_id'],
            models.CourseReview.course_id == review['course_id'],
            models.CourseReview.academic_year == review['academic_year'],
            models.CourseReview.semester == review['semester']
        )
    ).first()
    
    if user_review:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {review['email']} has already reviewed Course {review['course_id']}{review['subclass_id']} / Year {review['academic_year']} / Semester {review['semester']}."
        )
         
    new_review = models.CourseReview(**review)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review
