from sqlalchemy.exc import SQLAlchemyError
from backend.app.db.models import User, Base
from backend.app.db.database import engine, SessionLocal

def create_tables():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("The tables have been successfully created.")

def seed_user():
    print("Adding a test user...")
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == "test").first()
        if not user:
            new_user = User(username="test", password="test123", role="admin")
            db.commit()
            print("The user 'test' has been successfully created.")
        else:
            print("The user 'test' already exists.")
    except SQLAlchemyError as e:
        db.rollback()
        print("Error creating user:", str(e))
    finally:
        db.close()

if __name__ == "__main__":
    create_tables()
    seed_user()
