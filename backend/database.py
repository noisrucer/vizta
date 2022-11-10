from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .envs import DBEnvs

SQLAHCEMY_DATABASE_URL = f"mysql+pymysql://{DBEnvs.USERNAME}:{DBEnvs.PASSWORD}@{DBEnvs.HOST}/{DBEnvs.DB_NAME}"

engine = create_engine(SQLAHCEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()