from typing import Union
from enum import Enum

from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.sql.expression import text
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
    
class Faculty(str, Enum):
    all = "All"
    beng = "BEng"
    bba = "BBA"
    bsc = "BSC"
    
# Course
class Course(Base):
    __tablename__ = "course"
    
    course_id = Column(String(100), nullable=False, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=True)
    faculty = Faculty
    

class CoursePrerequisite(Base):
    __tablename__ = "course_prerequisite"
    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True)
    prereq_course_id = Column(String(100, ForeignKey('course.course_id'), nullable=False), primary_key=True)