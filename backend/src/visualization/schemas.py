from typing import List
from pydantic import BaseModel, EmailStr
from typing import Union, Mapping

import backend.src.course.enums as course_enums


class TimeslotBase(BaseModel):
    Weekday: str
    StartTime: str
    EndTime: str
    Location: str


class Timetable(BaseModel):
    Timeslots: List[TimeslotBase]
    Instructor: str


class GeneralVisualizationOut(BaseModel):
    TotalNumReviews: int
    GPA: List[dict]
    LectureDifficulty: List[dict]
    FinalDifficulty: List[dict]
    Workload: List[dict]
    LectureQuality: Mapping[str, int]
    Badges: Mapping[str,  str]
    Pentagon: List[dict]
    Timetable: Union[Mapping[str, Timetable], None]
