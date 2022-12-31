from sqlalchemy import Column, String, Integer, SmallInteger, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean

from backend.src.database import Base

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

class Subclass(Base):
    __tablename__ = "subclass"
    
    subclass_id = Column(String(1), nullable=False, primary_key=True, index=True)
    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True, index=True)
    academic_year = Column(SmallInteger, nullable=False, primary_key=True, index=True)
    semester = Column(SmallInteger, nullable=False, primary_key=True, index=True)
    professor_name = Column(String(100), nullable=False)
    final_exam_ratio = Column(Integer, nullable=True)
    midterm_ratio = Column(Integer, nullable=True)
    assignments_ratio = Column(Integer, nullable=True)
    project_ratio = Column(Integer, nullable=True)
    
    
class SubclassInfo(Base):
    __tablename__ = "subclass_info"
    
    subclass_id = Column(String(1), ForeignKey('subclass.subclass_id'), nullable=False, primary_key=True)
    course_id = Column(String(100), ForeignKey('subclass.course_id'), nullable=False, primary_key=True)
    academic_year = Column(SmallInteger, ForeignKey('subclass.academic_year'), nullable=False, primary_key=True, index=True)
    semester = Column(SmallInteger, ForeignKey('subclass.semester'), nullable=False, primary_key=True, index=True)
    week_day = Column(String(100), nullable=False, primary_key=True)
    stime = Column(String(5), nullable=False)
    etime = Column(String(5), nullable=False)
    class_loca = Column(String(100), nullable=False)


class CourseReview(Base):
    __tablename__ = "course_review"

    review_id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), ForeignKey('user.email'), nullable=False, primary_key=True)
    subclass_id = Column(String(1), ForeignKey('subclass.subclass_id'), nullable=False, primary_key=True)
    course_id = Column(String(100), ForeignKey('subclass.course_id'), nullable=False, primary_key=True)
    academic_year = Column(SmallInteger, ForeignKey('subclass.academic_year'), nullable=False, primary_key=True)
    semester = Column(SmallInteger, ForeignKey('subclass.semester'), nullable=False, primary_key=True)
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