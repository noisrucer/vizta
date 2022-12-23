from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)

@router.get('/{faculty}')
async def get_users(db: Session=Depends(get_db), skip: int = 0, limit: int = 100):
    pass
