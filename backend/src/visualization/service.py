from typing import Union, List

from sqlalchemy.orm import Session, InstrumentedAttribute
from sqlalchemy import func, outerjoin, column, select, case

import backend.src.course.models as course_models
from backend.src.visualization.constants import gpa_mapping


def get_course_by_course_id(db: Session, course_id: str):
    return db.query(course_models.Course).filter(course_models.Course.course_id == course_id).first()


def get_newest_grading_ratio(db: Session, course_id: str, prof_name: str,
                             grade_constitution: List[InstrumentedAttribute]):
    return db.query(*[gc.label(gc.key) for gc in grade_constitution]). \
        filter(course_models.Subclass.course_id == course_id,
               course_models.Subclass.professor_name == prof_name,
               # Assume all ratio are either null together or not null together
               course_models.Subclass.final_exam_ratio is not None). \
        order_by(course_models.Subclass.academic_year.desc(), course_models.Subclass.semester.desc()). \
        first()


def get_newest_semester_of_review(db: Session, course_id: str):
    return db.query(course_models.SubclassInfo.academic_year, course_models.SubclassInfo.semester). \
        filter(course_models.SubclassInfo.course_id == course_id). \
        order_by(course_models.SubclassInfo.academic_year.desc(), course_models.SubclassInfo.semester.desc()). \
        first()


def get_timetable(db: Session, course_id: str, academic_year: int, semester: int,
                  timetable_column: List[InstrumentedAttribute]):
    return db.query(*timetable_column). \
        join(course_models.SubclassInfo.rsub_class). \
        filter(course_models.SubclassInfo.course_id == course_id,
               course_models.SubclassInfo.academic_year == academic_year,
               course_models.SubclassInfo.semester == semester). \
        all()


def get_all_review(db: Session, course_id: str, year: Union[int, None] = None, professor: Union[str, None] = None):
    seccion = db.query(course_models.CourseReview).filter(course_models.CourseReview.course_id == course_id)
    # Optional filter
    if year is not None:
        seccion = seccion.filter(course_models.CourseReview.academic_year == year)
    if professor is not None:
        seccion = seccion. \
            join(course_models.CourseReview.rsub_class). \
            filter(course_models.Subclass.professor_name == professor)

    return seccion.order_by(course_models.CourseReview.academic_year, course_models.CourseReview.semester).all()


def get_course_average_review(db: Session, course_id: str,
                              avg_column: List[InstrumentedAttribute],
                              year: Union[int, None] = None, professor: Union[str, None] = None):
    seccion = db.query(*[func.avg(_) for _ in avg_column]).filter(course_models.CourseReview.course_id == course_id)

    # Optional filter
    if year is not None:
        seccion = seccion.filter(course_models.CourseReview.academic_year == year)
    if professor is not None:
        seccion = seccion. \
            join(course_models.CourseReview.rsub_class). \
            filter(course_models.Subclass.professor_name == professor)

    return seccion.order_by(course_models.CourseReview.academic_year, course_models.CourseReview.semester).first()


def get_course_average_gpa(db: Session, course_id: str,
                           year: Union[int, None] = None, professor: Union[str, None] = None):
    gpa_convertion = case(
        [
            (course_models.CourseReview.gpa == g, p)
            for g, p in gpa_mapping
        ]
    )

    seccion = db.query(func.avg(gpa_convertion)).filter(course_models.CourseReview.course_id == course_id)

    # Optional filter
    if year is not None:
        seccion = seccion.filter(course_models.CourseReview.academic_year == year)
    if professor is not None:
        seccion = seccion. \
            join(course_models.CourseReview.rsub_class). \
            filter(course_models.Subclass.professor_name == professor)

    return seccion.order_by(course_models.CourseReview.academic_year, course_models.CourseReview.semester).first()


def get_profs_average_gpa(db: Session, course_id: str,
                          year: Union[int, None] = None, professor: Union[str, None] = None):
    gpa_convertion = case(
        [
            (course_models.CourseReview.gpa == g, p)
            for g, p in gpa_mapping
        ]
    )

    seccion = db.query(course_models.Subclass.professor_name, func.avg(gpa_convertion)).\
        filter(course_models.CourseReview.course_id == course_id).\
        join(course_models.CourseReview.rsub_class).\
        group_by(course_models.Subclass.professor_name)

    # Optional filter
    if year is not None:
        seccion = seccion.filter(course_models.CourseReview.academic_year == year)

    if professor is not None:
        seccion = seccion.filter(course_models.Subclass.professor_name == professor)

    return seccion.all()


def get_all_years_of_course_review(db: Session, course_id: str):
    all_year = db.query(course_models.CourseReview.academic_year). \
        filter(course_models.CourseReview.course_id == course_id). \
        order_by(course_models.CourseReview.academic_year). \
        distinct(). \
        all()

    return [_.academic_year for _ in all_year]


def get_all_prof_of_course(db: Session, course_id: str):
    all_prof = db.query(course_models.Subclass.professor_name). \
        filter(course_models.Subclass.course_id == course_id). \
        order_by(course_models.Subclass.professor_name). \
        distinct(). \
        all()

    return [_.professor_name for _ in all_prof]


def get_complete_average_review(db: Session, course_id: str,
                                avg_column: List[InstrumentedAttribute]):
    """

    Get average review by year and professor
    Complete: include missing value, filled with null

    :param course_id: course id e.g. COMP3322
    :param avg_column: columns in list of models.CourseReview class attr
    :return: [year, *avg_column + gpa final value]
    """

    gpa_convertion = case(
        [
            (course_models.CourseReview.gpa == g, p)
            for g, p in gpa_mapping
        ]
    )

    # First sub query, average value on reviews by year
    avg_reviews_by_year_prof_incomplete = db. \
        query(course_models.CourseReview.academic_year.label("year"),
              course_models.Subclass.professor_name.label("prof"),
              *[func.avg(_).label(_.key) for _ in avg_column],
              func.avg(gpa_convertion).label("GPA")). \
        join(course_models.CourseReview.rsub_class). \
        filter(course_models.CourseReview.course_id == course_id). \
        group_by(course_models.CourseReview.academic_year, course_models.Subclass.professor_name).subquery()

    # Second sub query, get all combination
    allyear_name = 'ayear'
    allprof_name = 'aprof'
    years_sq = db.query(course_models.CourseReview.academic_year). \
        filter(course_models.CourseReview.course_id == course_id). \
        order_by(course_models.CourseReview.academic_year). \
        distinct(). \
        subquery()

    prof_sq = db.query(course_models.Subclass.professor_name). \
        filter(course_models.Subclass.course_id == course_id). \
        order_by(course_models.Subclass.professor_name). \
        distinct(). \
        subquery()

    all_combination = db.query(years_sq.c.academic_year.label(allyear_name),
                               prof_sq.c.professor_name.label(allprof_name)). \
        select_from(years_sq, prof_sq). \
        subquery()

    # First query, left join, fill missing value
    arbypi = avg_reviews_by_year_prof_incomplete
    avg_reviews_by_year_prof_complete = \
        outerjoin(all_combination, arbypi,
                  (arbypi.c.year == getattr(all_combination.c, allyear_name)) &
                  (arbypi.c.prof == getattr(all_combination.c, allprof_name)))

    return db.execute(
        select(column(allprof_name), *[getattr(arbypi.c, ac.key) for ac in avg_column], arbypi.c.GPA)
        .select_from(avg_reviews_by_year_prof_complete).order_by(allprof_name, allyear_name)).all()


def get_prof_stats(db: Session, course_id: str,
                   avg_column: List[InstrumentedAttribute]):
    """

    Get professor's stats in a course base on review

    :param course_id: course id e.g. COMP3322
    :param avg_column: columns in list of models.CourseReview class attr
    :return: [professor's name, *avg_column final value]
    """

    return db. \
        query(course_models.Subclass.professor_name.label("prof"),
              *[func.avg(_).label(_.key) for _ in avg_column]). \
        join(course_models.CourseReview.rsub_class). \
        filter(course_models.CourseReview.course_id == course_id). \
        group_by(course_models.Subclass.professor_name).all()
