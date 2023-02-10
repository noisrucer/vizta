from enum import Enum

class Major(str, Enum):
    comp_sci = "Computer Science"
    comp_eng = "Computer Engineering"
    info_sys = "Information System"
    other = "Other"