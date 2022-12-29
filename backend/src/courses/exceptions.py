from fastapi import HTTPException, status

class CourseNotExistException(HTTPException):
    def __init__(self, course_id: str):
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.detail = f"Course: {course_id} does not exist."
        
class UserFavoriteCourseAlreadyExistsException(HTTPException):
    def __init__(self, email: str, course_id: str):
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.detail = f"User {email} has already added {course_id} as a favorite."
        
        
class SubclassNotExistException(HTTPException):
    def __init__(self, course_id: str, subclass_id: str, academic_year: int, semester: int):
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.detail = f"Course {course_id}{subclass_id} / Year {academic_year} / Semester {semester} doesn't exist in database."
        
        
class UserAlreadyReviewedCourseException(HTTPException):
    def __init__(self, email: str, course_id: str, subclass_id: str, academic_year: int, semester: int):
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.detail = f"User {email} has already reviewed Course {course_id}{subclass_id} / Year {academic_year} / Semester {semester}."