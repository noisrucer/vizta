from fastapi import APIRouter, Depends
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