import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.user import UserCreate
from backend.app.core.security import create_access_token, verify_password
from backend.app.dependencies.auth import get_db
from backend.app.crud.user import get_user, create_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

logging.basicConfig(level=logging.INFO)

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db, user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user(db, form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(user)
    return {"access_token": access_token, "token_type": "bearer"}


