from sqlalchemy import Column, String, Integer, SmallInteger, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean

from backend.src.database import Base

class UserFavorite(Base):
    __tablename__ = "user_favorite"
    email = Column(String(100), ForeignKey('user.email'), nullable=False, primary_key=True)
    course_id = Column(String(100), ForeignKey('course.course_id'), nullable=False, primary_key=True)