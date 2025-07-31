from fastapi import HTTPException
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from backend.app.db import models
from typing import Optional
from backend.app.crud.user import get_user

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_secret_key():
    return SECRET_KEY

def get_algorithm():
    return ALGORITHM

def create_access_token(user: models.User, expires_delta: Optional[timedelta] = None):
    if expires_delta is None:
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    to_encode = {"sub": user.username, "role": user.role, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, get_secret_key(), algorithm=get_algorithm())
    return encoded_jwt

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def verify_token(token: str, db):
    try:
        payload = jwt.decode(token, get_secret_key(), algorithms=[get_algorithm()])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        
        user = get_user(db, username)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_password_hash(password: str):
    return pwd_context.hash(password)
