from fastapi import Depends
from sqlalchemy.orm import Session 
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from backend.src.database import get_db
import backend.src.auth.service as service
import backend.src.auth.exceptions as exceptions
import backend.src.auth.schemas as schemas
import backend.src.auth.utils as utils


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scheme_name="JWT",
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)):
    try:
        user_email = utils.decode_jwt(token)
        if user_email is None:
            raise exceptions.CredentialsException()
        token_data = schemas.TokenData(username=user_email)
    except JWTError:
        raise exceptions.CredentialsException()
    user = service.get_user_by_email(email=token_data.username, db=db)
    if user is None:
        raise exceptions.CredentialsException()
    return user