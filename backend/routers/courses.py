from collections import Counter
from decimal import Decimal

from typing import Union

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, select, outerjoin, column

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


# TODO: API for grading ratio (final exam, midterm, assignments, project, ). Only newest

@router.get('/visualization/{course_id}/years')
async def get_yearly_trand(course_id: str, db: Session = Depends(get_db)):
    # First query, average value on reviews by year
    mcr = models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty, mcr.course_entertaining,
                  mcr.course_delivery, mcr.course_interactivity]

    avg_reviews_by_year_prof_incomplete = db. \
        query(models.CourseReview.academic_year.label("year"), models.Subclass.professor_name.label("prof"),
              *[func.avg(_).label(_.key) for _ in avg_column]). \
        join(models.CourseReview.rsub_class). \
        filter(models.CourseReview.course_id == course_id). \
        group_by(models.CourseReview.academic_year, models.Subclass.professor_name).subquery()

    # Second query, get all combination
    allyear_name = 'ayear'
    allprof_name = 'aprof'
    years_sq = db.query(models.CourseReview.academic_year).order_by(
        models.CourseReview.academic_year).distinct().subquery()
    prof_sq = db.query(models.Subclass.professor_name).filter(
        models.Subclass.course_id == course_id).order_by(
        models.Subclass.professor_name).distinct().subquery()
    all_combination = db.query(years_sq.c.academic_year.label(allyear_name),
                               prof_sq.c.professor_name.label(allprof_name)).select_from(years_sq, prof_sq).subquery()

    # Third query, get all years
    allyear = [_.academic_year for _ in db.query(years_sq).all()]

    # Third query, get all profs
    allprof = [_.professor_name for _ in db.query(prof_sq).all()]

    # Fourth query, left join, fill missing value
    arbypi = avg_reviews_by_year_prof_incomplete
    avg_reviews_by_year_prof_complete = \
        outerjoin(all_combination, arbypi,
                  (arbypi.c.year == getattr(all_combination.c, allyear_name)) &
                  (arbypi.c.prof == getattr(all_combination.c, allprof_name)))

    avg_reviews_by_year_prof_complete = db.execute(
        select(column(allprof_name), *[getattr(arbypi.c, ac.key) for ac in avg_column])
        .select_from(avg_reviews_by_year_prof_complete).order_by(allprof_name, allyear_name)).all()

    # convert any Decimal object to float
    avg_reviews_by_year_prof_complete = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in
                                         avg_reviews_by_year_prof_complete]

    def VarCapitalize(var_name):
        return ''.join([str(_).capitalize() for _ in var_name.split('_')])

    arbypc = avg_reviews_by_year_prof_complete

    return {
        "years": allyear,
        "professors": allprof,
        **{
            VarCapitalize(ac.key): [
                # i + 1 as first column is year in arbypc
                [average_review[i + 1] for average_review in arbypc[ii * len(allyear):(ii + 1) * len(allyear)]]
                for ii in range(len(allprof))
            ]
            for i, ac in enumerate(avg_column)
        }
    }


@router.get('/visualization/{course_id}')
async def get_general_visualization(course_id: str, year: Union[int, None] = None, professor: Union[str, None] = None,
                                    db: Session = Depends(get_db)):
    # when year/professor are default, return timetable
    is_timetable = year is None and professor is None

    def qu_filter(seccion):
        seccion = seccion.filter(models.CourseReview.course_id == course_id)
        # Optional filter
        if year is not None:
            seccion = seccion.filter(models.CourseReview.academic_year == year)
        if professor is not None:
            seccion = seccion. \
                join(models.CourseReview.rsub_class). \
                filter(models.Subclass.professor_name == professor)

        return seccion

    # First query, all review
    reviews = qu_filter(db.query(models.CourseReview)).order_by(models.CourseReview.academic_year,
                                                                models.CourseReview.semester).all()

    # Second query, average review
    mcr = models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty, mcr.course_entertaining,
                  mcr.course_delivery, mcr.course_interactivity]
    avg_reviews = qu_filter(
        db.query(*[func.avg(_) for _ in avg_column])
    ).order_by(models.CourseReview.academic_year, models.CourseReview.semester).first()

    # convert any Decimal object to float
    avg_reviews = [float(c) if isinstance(c, Decimal) else c for c in avg_reviews]

    def CountEnum(values, enumTy):
        # uncomment this instead if zero values not needed
        # return Counter(values)

        return {k.value: 0 for k in enumTy} | Counter(values)

    result = {
        "GPA": CountEnum([_.gpa for _ in reviews], GPA),
        "LectureDifficulty": CountEnum([_.lecture_difficulty for _ in reviews], NumericEval),
        "FinalDifficulty": CountEnum([_.final_exam_difficulty for _ in reviews], NumericEval),
        "Workload": CountEnum([_.workload for _ in reviews], NumericEval),
        "TeachingQuality": {
            "Entertaining": CountEnum([_.course_entertaining for _ in reviews], NumericEval),
            "Delivery": CountEnum([_.course_delivery for _ in reviews], NumericEval),
            "Interactivity": CountEnum([_.course_interactivity for _ in reviews], NumericEval)
        },
        "Pentagon": {
            # FIXME: How to get average gpa on string gpa
            # "GPA": CountEnum([_.gpa for _ in reviews], GPA),
            "LectureDifficulty": avg_reviews[avg_column.index(models.CourseReview.lecture_difficulty)],
            "FinalDifficulty": avg_reviews[avg_column.index(models.CourseReview.final_exam_difficulty)],
            "Workload": avg_reviews[avg_column.index(models.CourseReview.workload)],
            "TeachingQuality":
                (
                        avg_reviews[avg_column.index(models.CourseReview.course_entertaining)] +
                        avg_reviews[avg_column.index(models.CourseReview.course_delivery)] +
                        avg_reviews[avg_column.index(models.CourseReview.course_interactivity)]
                ) / 3
                if all(avg_reviews)
                else None
        }
    }

    if is_timetable:
        # Third query, get the newest semester of available subclass
        newest_semester = db.query(models.SubclassInfo.academic_year, models.SubclassInfo.semester). \
            filter(models.SubclassInfo.course_id == course_id). \
            order_by(models.SubclassInfo.academic_year.desc(), models.SubclassInfo.semester.desc()). \
            first()

        if newest_semester:
            query_list = [models.SubclassInfo.subclass_id,
                          models.SubclassInfo.week_day, models.SubclassInfo.stime, models.SubclassInfo.etime,
                          models.SubclassInfo.class_loca, models.Subclass.professor_name]

            # Fourth query, get timetable
            timetables = db.query(*query_list). \
                join(models.SubclassInfo.rsub_class). \
                filter(models.SubclassInfo.course_id == course_id,
                       models.SubclassInfo.academic_year == newest_semester[0],
                       models.SubclassInfo.semester == newest_semester[1]). \
                all()

            def get(ttb, col):
                return ttb[query_list.index(col)]

            tb_result = {}
            for tb in timetables:
                subclass_id = get(tb, models.SubclassInfo.subclass_id)
                if subclass_id not in tb_result:
                    tb_result[subclass_id] = {"Timeslots": [],
                                              "Instructor": get(tb, models.Subclass.professor_name)}
                tb_result[subclass_id]["Timeslots"].append({
                    "Weekday": get(tb, models.SubclassInfo.week_day),
                    "StartTime": get(tb, models.SubclassInfo.stime),
                    "EndTime": get(tb, models.SubclassInfo.etime),
                    "Location": get(tb, models.SubclassInfo.class_loca)
                })

            result |= {
                "Timetable": tb_result
            }

    return result


"""
@router.get('/review/{course_id}', response_model=schemas.ReviewOut)
async def get_review(course_id: str, db: Session = Depends(get_db)):
    # First query, list of all review on the course
    reviews = db.query(models.CourseReview).filter(models.CourseReview.course_id == course_id).order_by(
        models.CourseReview.academic_year, models.CourseReview.semester).all()

    # Second query, average value on reviews by year
    mcr = models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty, mcr.course_entertaining,
                  mcr.course_delivery, mcr.course_interactivity]

    avg_reviews_by_year = db. \
        query(models.CourseReview.academic_year, *[func.avg(_) for _ in avg_column]). \
        filter(models.CourseReview.course_id == course_id). \
        group_by(models.CourseReview.academic_year). \
        order_by(models.CourseReview.academic_year).all()

    # Third query, average value on every reviews
    avg_reviews = db. \
        query(*[func.avg(_) for _ in avg_column]). \
        filter(models.CourseReview.course_id == course_id).first()

    # convert any Decimal object to float
    avg_reviews = [float(c) if isinstance(c, Decimal) else c for c in avg_reviews]
    avg_reviews_by_year = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in avg_reviews_by_year]

    # TODO: 6. Overall - pentagon with each edge representing the average of each criteria. Missing?
    # TODO: 7. (top of page) other info (final exam, midterm, assignments, project, ).
    #  Since it may vary by year or semester, show only the newest course(subclass) info?
    # FIXME: How to get average gpa on string gpa

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
        "Pentagon": {
            # "GPA": CountEnum([_.gpa for _ in reviews], GPA),
            "LectureDifficulty": avg_reviews[avg_column.index(models.CourseReview.lecture_difficulty)],
            "FinalDifficulty": avg_reviews[avg_column.index(models.CourseReview.final_exam_difficulty)],
            "Workload": avg_reviews[avg_column.index(models.CourseReview.workload)],
            "TeachingQuality":
                (
                        avg_reviews[avg_column.index(models.CourseReview.course_entertaining)] +
                        avg_reviews[avg_column.index(models.CourseReview.course_delivery)] +
                        avg_reviews[avg_column.index(models.CourseReview.course_interactivity)]
                ) / 3
        },
        # "CourseInfo": {
        #     "ExamRatio": 1,
        #     "Midterm": 1,
        #     "Assignments": 1,
        #     "Project": 1,
        # },
        "ByYear": {
            "ColumnName": ['academic_year', *[c.key for c in avg_column]],
            "Values": avg_reviews_by_year
        }
    }
"""
