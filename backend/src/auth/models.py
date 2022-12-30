from sqlalchemy import Column, Integer, SmallInteger, String, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean

from backend.src.database import Base