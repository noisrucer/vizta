from decimal import Decimal

from requests import Session
from typing import Union

from fastapi import APIRouter, Depends

import backend.src.course.models as course_models
import backend.src.course.service as course_service
import backend.src.course.enums as course_enums
import backend.src.course.exceptions as course_exceptions

import backend.src.visualization.service as visualization_service
import backend.src.visualization.schemas as schemas

import backend.src.dependencies as glob_dependencies
import backend.src.utils as glob_utils
import backend.src.visualization.utils as visualization_utils
import backend.src.visualization.constants as constants

from backend.src.database import get_db
import pprint

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
    # Prerequisites & Mutex & blocking courses & allowed years
    prerequisite = course_service.get_prerequisites_by_course_id(db, course.course_id)
    mutual_exclusives = course_service.get_mutual_exclusives_by_course_id(db, course.course_id)
    blocking_courses = course_service.get_blocking_courses_by_course_id(db, course.course_id)
    allowed_years = course_service.get_course_allowed_years_by_course_id(db, course.course_id)
    
    grading_ratio_data = {
            "Constitution": [glob_utils.capitalize_variable(gc.key[:gc.key.rfind('_')]) for gc in grade_constitution],
            "Values": gradings
    }
    
    
    grading_ratio_response = {}
    for prof, ratio_list in grading_ratio_data['Values'].items():
        prof_data = []
        for i in range(len(grading_ratio_data['Constitution'])):
            criteria = grading_ratio_data['Constitution'][i]
            ratio = ratio_list[i]
            prof_data.append({
                "id": criteria,
                "label": criteria,
                "value": ratio,
                "color": "hsl(360, 70%, 50%)"
            })
        grading_ratio_response[prof] = prof_data
        
    return {
        "CourseID": course.course_id,
        "Name": course.name,
        "Faculty": course.faculty,
        "Description": course.description,
        "Prerequisite": prerequisite,
        "MutualExclusives": mutual_exclusives,
        "BlockingCourses": blocking_courses,
        "AllowedYears": allowed_years,

        # grading ratio
        "GradingRatio": grading_ratio_response,
        "Timetable": time_table
    }


@router.get('/{course_id}/years',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_available_years(course_id: str, db: Session = Depends(get_db)):
    return visualization_service.get_all_years_of_course_review(db, course_id) + ['All']


@router.get('/{course_id}/by_years',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_yearly_trand(course_id: str, db: Session = Depends(get_db)):
    # First query, average value on reviews by year
    mcr = course_models.CourseReview
    avg_column = [mcr.workload,
                  mcr.lecture_difficulty,
                  mcr.final_exam_difficulty,
                  mcr.course_entertainment,
                  mcr.course_delivery,
                  mcr.course_interactivity]

    avg_reviews = visualization_service.get_complete_average_review(db, course_id, avg_column)

    # convert any Decimal object to float
    avg_reviews = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in avg_reviews]

    all_year = visualization_service.get_all_years_of_course_review(db, course_id)
    all_prof = visualization_service.get_all_prof_of_course(db, course_id)

    line_data = {
        "years": all_year,
        "professors": sorted(all_prof),
        **{
            glob_utils.capitalize_variable(ac.key): [
                # i + 1 as first column is year in avg_reviews
                [average_review[i + 1] for average_review in avg_reviews[ii * len(all_year):(ii + 1) * len(all_year)]]
                for ii in range(len(all_prof))
            ]
            for i, ac in enumerate(avg_column)
        },
        "GPA": [
            # i + 1 as first column is year in avg_reviews
            [average_review[len(avg_column) + 1] for average_review in
             avg_reviews[ii * len(all_year):(ii + 1) * len(all_year)]]
            for ii in range(len(all_prof))
        ]
    }
    
    line_response = {}
    criteria = ["GPA", "Workload", "LectureDifficulty", "FinalExamDifficulty", "CourseEntertainment", "CourseDelivery", "CourseInteractivity"]
    for c in criteria:
        criteria_data = []
        for prof_idx in range(len(line_data['professors'])):
            prof_data = {"id": line_data['professors'][prof_idx], "color": "hsl(123, 70%, 50%)", "data": []}
            for i in range(len(line_data['years'])):
                prof_data['data'].append({
                    "x": str(line_data['years'][i]),
                    "y": line_data[c][prof_idx][i]
                })
            criteria_data.append(prof_data)
        line_response[c] = criteria_data
        
    return line_response
                
            


@router.get('/{course_id}/professors',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_available_professors(course_id: str, db: Session = Depends(get_db)):
    return visualization_service.get_all_prof_of_course(db, course_id) + ['All']


@router.get('/{course_id}/by_professors',
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_prof_stats(course_id: str, db: Session = Depends(get_db)):
    # First query, average value on reviews by prof
    mcr = course_models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty,
                  mcr.course_entertainment, mcr.course_delivery, mcr.course_interactivity]

    avg_reviews_by_prof = visualization_service.get_prof_stats(db, course_id, avg_column)
    avg_gpa = visualization_service.get_profs_average_gpa(db, course_id)

    # convert any Decimal object to float
    avg_reviews_by_prof = [[float(c) if isinstance(c, Decimal) else c for c in rbs] for rbs in avg_reviews_by_prof]
    avg_reviews_by_prof = sorted(avg_reviews_by_prof, key = lambda x: x[0])

    prof_stats = [
        {
            "professor": prof_review[0],
            # i + 1 as first column is professor name in prof_review
            "LectureDifficulty": prof_review[avg_column.index(mcr.lecture_difficulty) + 1],
            "FinalExamDifficulty": prof_review[avg_column.index(mcr.final_exam_difficulty) + 1],
            "Workload": prof_review[avg_column.index(mcr.workload) + 1],
            "LectureQuality":
                (
                        prof_review[avg_column.index(mcr.course_entertainment) + 1] +
                        prof_review[avg_column.index(mcr.course_delivery) + 1] +
                        prof_review[avg_column.index(mcr.course_interactivity) + 1]
                ) / 3,
            "GPA": next((g for p, g in avg_gpa if p == prof_review[0]), 'None')
        }
        for prof_review in avg_reviews_by_prof
    ]

    final_exam = {"criteria": "FinalExamDifficulty"}
    gpa = {"criteria": "GPA"}
    lecture_difficulty = {"criteria": "LectureDifficulty"}
    lecture_quality = {"criteria": "LectureQuality"}
    workload = {"criteria": "Workload"}
    prof_names = [review[0] for review in avg_reviews_by_prof]
    
    
    for prof_data in prof_stats:
        name = prof_data['professor']
        final_exam[name] = prof_data['FinalExamDifficulty']
        gpa[name] = prof_data['GPA']
        lecture_difficulty[name] = prof_data['LectureDifficulty']
        lecture_quality[name] = prof_data['LectureQuality']
        workload[name] = prof_data['Workload']

    return {
        "key": prof_names,
        "data": [final_exam, gpa, lecture_difficulty, lecture_quality, workload]
    }


@router.get('/{course_id}',
            response_model=schemas.GeneralVisualizationOut,
            dependencies=[Depends(glob_dependencies.get_current_user)])
async def get_general_visualization(course_id: str, year: Union[int, None] = None, professor: Union[str, None] = None,
                                    db: Session = Depends(get_db)):
    # First query, all review
    reviews = visualization_service.get_all_review(db, course_id, year, professor)
    total_num_reviews = len(reviews)

    # Second query, average review
    mcr = course_models.CourseReview
    avg_column = [mcr.workload, mcr.lecture_difficulty, mcr.final_exam_difficulty, mcr.course_entertainment,
                  mcr.course_delivery, mcr.course_interactivity]
    avg_reviews = visualization_service.get_course_average_review(db, course_id, avg_column, year, professor)

    # Third query, avg gpa
    avg_gpa = visualization_service.get_course_average_gpa(db, course_id, year, professor)[0]

    # convert any Decimal object to float
    avg_reviews = [float(c) if isinstance(c, Decimal) else c for c in avg_reviews]

    def to_key_value_list(values, enumTy):
        return glob_utils.dict_as_list(glob_utils.count_enum(values, enumTy))

    gpa_letter = ['A', 'B', 'C', 'D']
    gpa_count = glob_utils.count_enum([_.gpa for _ in reviews], course_enums.GPA)

    badges_text = ['HARD', 'MEDIUM', 'EASY']
    badges_break_point = [5 / 3, 10 / 3, 15 / 3]

    def get_badges(val):
        return 'NONE' if val is None else badges_text[next(i for i, v in enumerate(badges_break_point) if v >= val)]

    letter_groups = ['A', 'B', 'C', 'D', 'F']
    letter_group_sub = {
        'A': ['+', '', '-'],
        'B': ['+', '', '-'],
        'C': ['+', '', '-'],
        'D': ['+', ''],
        'F': [''],
    }
    
    gpa_response = []
    for letter in letter_groups:
        info = {}
        for sub in letter_group_sub[letter]:
            info[f"{letter}{sub}"] = {
                "count": gpa_count[f"{letter}{sub}"],
                "color": constants.GPA_SUB_COLOR[letter][sub]
            }
        gpa_response.append(visualization_utils.build_gpa_resp(letter, info))
    
    # Lecture Difficulty Response
    lecture_difficulty_data = to_key_value_list([_.lecture_difficulty for _ in reviews], course_enums.NumericEval)
    lecture_difficulty_response = []
    for idx, difficulty in enumerate(lecture_difficulty_data['keys']):
        label_name = constants.DIFFICULTY_LABEL[difficulty]
        label_name_no_space = ''.join(label_name.split())
        lecture_difficulty_response.append(
            {
                "group": constants.DIFFICULTY_LABEL[difficulty],
                label_name_no_space: lecture_difficulty_data['values'][idx],
                f"{label_name_no_space}Color": constants.DIFFICULTY_COLOR[label_name_no_space]
            }
        )
    
    # Final Difficulty Response
    final_difficulty_data = to_key_value_list([_.final_exam_difficulty for _ in reviews], course_enums.NumericEval)
    final_difficulty_response = []
    for idx, difficulty in enumerate(final_difficulty_data['keys']):
        label_name = constants.DIFFICULTY_LABEL[difficulty]
        label_name_no_space = ''.join(label_name.split())
        final_difficulty_response.append(
            {
                "group": constants.DIFFICULTY_LABEL[difficulty],
                label_name_no_space: final_difficulty_data['values'][idx],
                f"{label_name_no_space}Color": constants.DIFFICULTY_COLOR[label_name_no_space]
            }
        )
    
    # Workload
    workload_data = to_key_value_list([_.workload for _ in reviews], course_enums.NumericEval)
    workload_response = []
    for idx, difficulty in enumerate(workload_data['keys']):
        label_name = constants.WORKLOAD_LABEL[difficulty]
        label_name_no_space = ''.join(label_name.split())
        workload_response.append(
            {
                "group": constants.WORKLOAD_LABEL[difficulty],
                label_name_no_space: workload_data['values'][idx],
                f"{label_name_no_space}Color": constants.WORKLOAD_COLOR[label_name_no_space]
            }
        )
        
    entertainment = to_key_value_list([_.course_entertainment for _ in reviews], course_enums.NumericEval)
    delivery = to_key_value_list([_.course_delivery for _ in reviews], course_enums.NumericEval)
    interactivity = to_key_value_list([_.course_interactivity for _ in reviews], course_enums.NumericEval)
    
    entertainment_avg, delivery_avg, interactivity_avg = 0, 0, 0
    for i in range(len(entertainment['keys'])):
        entertainment_avg += entertainment['keys'][i] * entertainment['values'][i]
        delivery_avg += delivery['keys'][i] * delivery['values'][i]
        interactivity_avg += interactivity['keys'][i] * interactivity['values'][i]
    
    entertainment_avg = entertainment_avg / sum(entertainment['values']) * 20 if sum(entertainment['values']) else 0
    delivery_avg = delivery_avg / sum(delivery['values']) * 20 if sum(delivery['values']) else 0
    interactivity_avg = interactivity_avg / sum(interactivity['values']) * 20 if sum(interactivity['values']) else 0

    pentagon = {
            "GPA": avg_gpa,
            "LectureDifficulty": avg_reviews[avg_column.index(mcr.lecture_difficulty)],
            "FinalDifficulty": avg_reviews[avg_column.index(mcr.final_exam_difficulty)],
            "Workload": avg_reviews[avg_column.index(mcr.workload)],
            "LectureQuality":
                (
                        avg_reviews[avg_column.index(mcr.course_entertainment)] +
                        avg_reviews[avg_column.index(mcr.course_delivery)] +
                        avg_reviews[avg_column.index(mcr.course_interactivity)]
                ) / 3
                if all(avg_reviews)
                else None
        }
    overall_score_data = []
    for pentagon_key in pentagon:
        overall_score_data.append({
            "criteria": pentagon_key,
            "overall": pentagon[pentagon_key]
        })
    
    result = {
        "TotalNumReviews": total_num_reviews,
        "GPA": gpa_response,
        "LectureDifficulty": lecture_difficulty_response,
        "FinalDifficulty": final_difficulty_response,
        "Workload": workload_response,
        "LectureQuality": {
            "Entertainment": int(entertainment_avg),
            "Delivery": int(delivery_avg),
            "Interactivity": int(interactivity_avg),
        },
        "Badges": {
            "LectureDifficulty": get_badges(avg_reviews[avg_column.index(mcr.lecture_difficulty)]),
            "FinalDifficulty": get_badges(avg_reviews[avg_column.index(mcr.final_exam_difficulty)]),
            "Workload": get_badges(avg_reviews[avg_column.index(mcr.workload)]),
            "GPA": visualization_utils.get_gpa_badge(avg_gpa) if avg_gpa else "NONE"
        },
        "Pentagon": overall_score_data
    }

    return result
