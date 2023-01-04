from decimal import Decimal

from requests import Session
from typing import Union

from fastapi import APIRouter, Depends

import backend.src.courses.models as course_models
import backend.src.courses.enums as course_enums
import backend.src.courses.exceptions as course_exceptions

import backend.src.visualization.service as visualization_service
import backend.src.visualization.schemas as schemas

import backend.src.dependencies as glob_dependencies
import backend.src.utils as glob_utils

from backend.src.database import get_db

router = APIRouter(
    prefix="/visualization",
    tags=["visualization"]
)


@router.get('/{course_id}/general_info',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_course_general_information(course_id: str, db: Session = Depends(get_db)):
    course = visualization_service.get_course_by_course_id(db, course_id)
    if not course:
        raise course_exceptions.CourseNotExistException(course_id)

    profs = visualization_service.get_all_prof_of_course(db, course_id)

    grade_constitution = [course_models.Subclass.final_exam_ratio,
                          course_models.Subclass.midterm_ratio,
                          course_models.Subclass.assignments_ratio,
                          course_models.Subclass.project_ratio]

    gradings = {}
    for prof in profs:
        ratio = visualization_service.get_newest_grading_ratio(db, course_id, prof, grade_constitution)
        gradings |= {prof: [_ for _ in ratio] if ratio is not None else None}

    newest_semester = visualization_service.get_newest_semester_of_review(db, course_id)

    time_table = {}
    if newest_semester:
        query_list = [course_models.SubclassInfo.subclass_id,
                      course_models.SubclassInfo.week_day, course_models.SubclassInfo.stime,
                      course_models.SubclassInfo.etime,
                      course_models.SubclassInfo.class_loca, course_models.Subclass.professor_name]

        # Fourth query, get timetable
        timetables = \
            visualization_service.get_timetable(db, course_id, newest_semester[0], newest_semester[1], query_list)

        def get(ttb, col):
            return ttb[query_list.index(col)]

        for tb in timetables:
            subclass_id = get(tb, course_models.SubclassInfo.subclass_id)
            if subclass_id not in time_table:
                time_table[subclass_id] = {"Timeslots": [],
                                          "Instructor": get(tb, course_models.Subclass.professor_name)}
            time_table[subclass_id]["Timeslots"].append({
                "Weekday": get(tb, course_models.SubclassInfo.week_day),
                "StartTime": get(tb, course_models.SubclassInfo.stime),
                "EndTime": get(tb, course_models.SubclassInfo.etime),
                "Location": get(tb, course_models.SubclassInfo.class_loca)
            })

    return {
        "CourseID": course.course_id,
        "Name": course.name,
        "Faculty": course.faculty,
        "Description": course.description,

        # grading ratio
        "GradingRatio": {
            "Constitution": [glob_utils.capitalize_variable(gc.key[:gc.key.rfind('_')]) for gc in grade_constitution],
            "Values": gradings
        },

        "Timetable": time_table
    }


@router.get('/{course_id}/years',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_yearly_trand(course_id: str, db: Session = Depends(get_db)):
    # First query, average value on reviews by year
    mcr = course_models.CourseReview
    avg_column = [mcr.workload,
                  mcr.lecture_difficulty,
                  mcr.final_exam_difficulty,
                  mcr.course_entertaining,
                  mcr.course_delivery,
                  mcr.course_interactivity]

    avg_reviews = visualization_service.get_complete_averagte_review(db, course_id, avg_column)

    # convert any Decimal object to float
    avg_reviews = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in avg_reviews]

    all_year = visualization_service.get_all_years_of_course_review(db, course_id)
    all_prof = visualization_service.get_all_prof_of_course(db, course_id)

    return {
        "years": all_year,
        "professors": all_prof,
        **{
            glob_utils.capitalize_variable(ac.key): [
                # i + 1 as first column is year in avg_reviews
                [average_review[i + 1] for average_review in avg_reviews[ii * len(all_year):(ii + 1) * len(all_year)]]
                for ii in range(len(all_prof))
            ]
            for i, ac in enumerate(avg_column)
        }
    }


@router.get('/{course_id}/professors',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_prof_stats(course_id: str, db: Session = Depends(get_db)):
    # First query, average value on reviews by prof
    mcr = course_models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty,
                  mcr.course_entertaining, mcr.course_delivery, mcr.course_interactivity]

    avg_reviews_by_prof = visualization_service.get_prof_stats(db, course_id, avg_column)

    # convert any Decimal object to float
    avg_reviews_by_prof = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in avg_reviews_by_prof]

    return {
        prof_review[0]: {
            # i + 1 as first column is professor name in prof_review
            "LectureDifficulty": prof_review[avg_column.index(mcr.lecture_difficulty) + 1],
            "FinalDifficulty": prof_review[avg_column.index(mcr.final_exam_difficulty) + 1],
            "Workload": prof_review[avg_column.index(mcr.workload) + 1],
            "TeachingQuality":
                (
                        prof_review[avg_column.index(mcr.course_entertaining) + 1] +
                        prof_review[avg_column.index(mcr.course_delivery) + 1] +
                        prof_review[avg_column.index(mcr.course_interactivity) + 1]
                ) / 3
        }
        for prof_review in avg_reviews_by_prof
    }


@router.get('/{course_id}',
            response_model=schemas.GeneralVisualizationOut,
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_general_visualization(course_id: str, year: Union[int, None] = None, professor: Union[str, None] = None,
                                    db: Session = Depends(get_db)):
    # First query, all review
    reviews = visualization_service.get_all_review(db, course_id, year, professor)

    # Second query, average review
    mcr = course_models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty, mcr.course_entertaining,
                  mcr.course_delivery, mcr.course_interactivity]
    avg_reviews = visualization_service.get_course_average_review(db, course_id, avg_column, year, professor)

    # Third query, avg gpa
    avg_gpa = visualization_service.get_course_average_gpa(db, course_id, year, professor)[0]

    # convert any Decimal object to float
    avg_reviews = [float(c) if isinstance(c, Decimal) else c for c in avg_reviews]

    result = {
        "GPA": glob_utils.count_enum([_.gpa for _ in reviews], course_enums.GPA),
        "LectureDifficulty": glob_utils.count_enum([_.lecture_difficulty for _ in reviews], course_enums.NumericEval),
        "FinalDifficulty": glob_utils.count_enum([_.final_exam_difficulty for _ in reviews], course_enums.NumericEval),
        "Workload": glob_utils.count_enum([_.workload for _ in reviews], course_enums.NumericEval),
        "TeachingQuality": {
            "Entertaining": glob_utils.count_enum([_.course_entertaining for _ in reviews], course_enums.NumericEval),
            "Delivery": glob_utils.count_enum([_.course_delivery for _ in reviews], course_enums.NumericEval),
            "Interactivity": glob_utils.count_enum([_.course_interactivity for _ in reviews], course_enums.NumericEval)
        },
        "Pentagon": {
            "GPA": avg_gpa,
            "LectureDifficulty": avg_reviews[avg_column.index(mcr.lecture_difficulty)],
            "FinalDifficulty": avg_reviews[avg_column.index(mcr.final_exam_difficulty)],
            "Workload": avg_reviews[avg_column.index(mcr.workload)],
            "TeachingQuality":
                (
                        avg_reviews[avg_column.index(mcr.course_entertaining)] +
                        avg_reviews[avg_column.index(mcr.course_delivery)] +
                        avg_reviews[avg_column.index(mcr.course_interactivity)]
                ) / 3
                if all(avg_reviews)
                else None
        }
    }

    return result
