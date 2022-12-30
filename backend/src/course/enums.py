from enum import Enum

class Faculty(str, Enum):
    all = "All"
    beng = "BEng"
    bba = "BBA"
    bsc = "BSC"
    cc = "CC"
    
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