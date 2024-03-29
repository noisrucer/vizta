from typing import Union
from enum import Enum

from sqlalchemy import Column, String, Integer, SmallInteger, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean

from backend.src.database import Base

class User(Base):
    __tablename__ = "user"
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), primary_key=True, unique=True, nullable=False)
    entered_year = Column(SmallInteger, unique=False, nullable=False)
    major = Column(String(50), nullable=False)
    password = Column(String(100), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))