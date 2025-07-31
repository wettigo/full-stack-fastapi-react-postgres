from sqlalchemy.orm import Session
from backend.app.db.models import User
from backend.app.schemas.user import UserCreate

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user_create: UserCreate):
    from backend.app.core.security import hash_password
    hashed_password = hash_password(user_create.password)
    db_user = User(username=user_create.username, password=hashed_password, role=user_create.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
