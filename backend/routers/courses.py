from collections import Counter
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas
from ..models import GPA, NumericEval

router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)


@router.get('/{faculty}', response_model=list[schemas.MainPageCourseOut])
async def get_courses(faculty: schemas.Faculty, db: Session = Depends(get_db)):
    # If faculty is all
    if faculty == 'All':
        courses = db.query(models.Course).all()
    else:  # If faculty is a specific faculty
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


@router.get('/review/{course_id}', response_model=schemas.ReviewOut)
async def get_review(course_id: str, db: Session = Depends(get_db)):
    # If faculty is all
    reviews = db.query(models.CourseReview).filter(models.CourseReview.course_id == course_id).all()

    # TODO: 6. Overall - pentagon with each edge representing the average of each criteria. Missing?
    # TODO: 7. (top of page) other info (final exam, midterm, assignments, project, ). Since it may vary by year or semester, show only the newest course(subclass) info?

    def CountEnum(values, enumTy):
        # uncomment this instead if zero values not needed
        # return Counter(values)

        return {k.value: 0 for k in enumTy} | Counter(values)

    return {
        "GPA": CountEnum([_.gpa for _ in reviews], GPA),
        "LectureDifficulty": CountEnum([_.lecture_difficulty for _ in reviews], NumericEval),
        "FinalDifficulty": CountEnum([_.final_exam_difficulty for _ in reviews], NumericEval),
        "Workload": CountEnum([_.workload for _ in reviews], NumericEval),
        "TeachingQuality": {
            "Entertaining": CountEnum([_.course_entertaining for _ in reviews], NumericEval),
            "Delivery": CountEnum([_.course_delivery for _ in reviews], NumericEval),
            "Interactivity": CountEnum([_.course_interactivity for _ in reviews], NumericEval)
        },
        # "CourseInfo": {
        #     "ExamRatio": 1,
        #     "Midterm": 1,
        #     "Assignments": 1,
        #     "Project": 1,
        # },
    }
