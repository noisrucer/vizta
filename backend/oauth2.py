from typing import Union
from datetime import datetime, timedelta
from jose import JWTError, jwt
from .config import JWTEnvs

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
        
    to_encode.update({
        "exp": expire
    })
    encoded_jwt = jwt.encode(to_encode, JWTEnvs.SECRET_KEY, algorithm=JWTEnvs.ALGORITHM)
    return encoded_jwt

def decode_jwt(token):
    payload = jwt.decode(token, JWTEnvs.SECRET_KEY, algorithms=[JWTEnvs.ALGORITHM])
    email: str = payload.get("sub")
    return email