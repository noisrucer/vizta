from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

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
    user = db.query(models.User).filter(models.User.user_id == user_fav_dict['user_id']).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {user_fav_dict['user_id']} does not exist in database."
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
        models.UserFavorite.user_id == user_fav_dict['user_id']
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


@router.get('/favorites/{user_id}', response_model = list[schemas.UserFavorite])
async def get_user_favorites(user_id: int, db: Session=Depends(get_db)):
    favorites = db.query(models.UserFavorite).filter(models.UserFavorite.user_id == user_id).all()
    return favorites