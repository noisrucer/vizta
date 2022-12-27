from sqlalchemy.orm import relationship
from typing import Union
from enum import Enum

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.sql.expression import text, and_
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean

from .database import Base


class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True, nullable=False)
    enteredYear = Column(String(4), unique=False, nullable=False)
    major = Column(String(50), nullable=False)
    password = Column(String(100), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))


# Course
class Course(Base):
    __tablename__ = "course"

    course_id = Column(String(100), nullable=False, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=True)
    faculty = Column(String(100), nullable=False)


class CoursePrerequisite(Base):
    __tablename__ = "course_prerequisite"

    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True)
    prereq_course_id = Column(String(100), nullable=False, primary_key=True)


class CourseExclusivity(Base):
    __tablename__ = "course_exclusivity"

    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True)
    exclu_course_id = Column(String(100), nullable=False, primary_key=True)


# class Semester(int, Enum):
#     one = 1
#     two = 2

class Subclass(Base):
    __tablename__ = "subclass"

    subclass_id = Column(String(1), nullable=False, primary_key=True, index=True)
    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True, index=True)
    academic_year = Column(Integer, nullable=False, primary_key=True, index=True)
    semester = Column(Integer, nullable=False, primary_key=True, index=True)
    professor_name = Column(String(100), nullable=False)
    final_exam_ratio = Column(Integer, nullable=True)
    midterm_ratio = Column(Integer, nullable=True)
    assignments_ratio = Column(Integer, nullable=True)
    project_ratio = Column(Integer, nullable=True)


class SubclassInfo(Base):
    __tablename__ = "subclass_info"

    subclass_id = Column(String(1), ForeignKey('subclass.subclass_id'), nullable=False, primary_key=True)
    course_id = Column(String(100), ForeignKey('subclass.course_id'), nullable=False, primary_key=True)
    academic_year = Column(Integer, ForeignKey('subclass.academic_year'), nullable=False, primary_key=True, index=True)
    semester = Column(Integer, ForeignKey('subclass.semester'), nullable=False, primary_key=True, index=True)
    week_day = Column(String(100), nullable=False, primary_key=True)
    stime = Column(String(5), nullable=False)
    etime = Column(String(5), nullable=False)
    class_loca = Column(String(100), nullable=False)
    rsub_class = relationship(
        "Subclass",
        primaryjoin="and_(SubclassInfo.subclass_id == Subclass.subclass_id,"
                    "SubclassInfo.course_id == Subclass.course_id,"
                    "SubclassInfo.academic_year == Subclass.academic_year,"
                    "SubclassInfo.semester == Subclass.semester)"
    )


class GPA(str, Enum):
    aplus = "A+"
    a = "A"
    aminus = "A-"
    bplus = "B+"
    b = "B"
    bminus = "B-"
    cplus = "C+"
    c = "C"
    cminus = "C-"
    dplus = "D+"
    d = "D"
    fail = "F"


class NumericEval(int, Enum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5
    six = 6
    seven = 7
    eight = 8
    nine = 9
    ten = 10


class CourseReview(Base):
    __tablename__ = "course_review"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False, primary_key=True)
    subclass_id = Column(String(1), ForeignKey('subclass.subclass_id'), nullable=False, primary_key=True)
    course_id = Column(String(100), ForeignKey('subclass.course_id'), nullable=False, primary_key=True)
    academic_year = Column(Integer, ForeignKey('subclass.academic_year'), nullable=False, primary_key=True)
    semester = Column(Integer, ForeignKey('subclass.semester'), nullable=False, primary_key=True)
    gpa = Column(String(2), nullable=False)
    workload = Column(Integer, nullable=False)
    lecture_difficulty = Column(Integer, nullable=False)
    final_exam_difficulty = Column(Integer, nullable=False)
    course_entertaining = Column(Integer, nullable=False)
    course_delivery = Column(Integer, nullable=False)
    course_interactivity = Column(Integer, nullable=False)
    final_exam_ratio = Column(Integer, nullable=False)
    midterm_ratio = Column(Integer, nullable=False)
    assignments_ratio = Column(Integer, nullable=False)
    project_ratio = Column(Integer, nullable=False)
    rsub_class = relationship(
        "Subclass",
        primaryjoin="and_(CourseReview.subclass_id == Subclass.subclass_id,"
                    "CourseReview.course_id == Subclass.course_id,"
                    "CourseReview.academic_year == Subclass.academic_year,"
                    "CourseReview.semester == Subclass.semester)"
    )
