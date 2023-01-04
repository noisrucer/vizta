from pydantic import BaseModel, EmailStr
from typing import Union, Mapping

import backend.src.course.enums as course_enums


class TimeslotBase(BaseModel):
    Weekday: str
    StartTime: str
    EndTime: str
    Location: str


class Timetable(BaseModel):
    Timeslots: list[TimeslotBase]
    Instructor: str


class GeneralVisualizationOut(BaseModel):
    GPA: Mapping[course_enums.GPA, int]
    LectureDifficulty: Mapping[course_enums.NumericEval, int]
    FinalDifficulty: Mapping[course_enums.NumericEval, int]
    Workload: Mapping[course_enums.NumericEval, int]
    TeachingQuality: Mapping[str, Mapping[course_enums.NumericEval, int]]
    Pentagon: Mapping[str, None | Union[str, float]]
    Timetable: Union[Mapping[str, Timetable], None]
