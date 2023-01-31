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
    GPA: list[list[int]]
    LectureDifficulty: Mapping[str,  Union[list[int], list[course_enums.NumericEval]]]
    FinalDifficulty: Mapping[str,  Union[list[int], list[course_enums.NumericEval]]]
    Workload: Mapping[str, Union[list[int], list[course_enums.NumericEval]]]
    LectureQuality: Mapping[str, Mapping[str, Union[list[int], list[course_enums.NumericEval]]]]
    Badges: Mapping[str,  str]
    Pentagon: Mapping[str, Union[None, Union[str, float]]]
    Timetable: Union[Mapping[str, Timetable], None]
