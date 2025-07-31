from sqlalchemy.orm import Session
from backend.app.db.models import Checklist
from typing import Optional
from backend.app.schemas.checklist import ChecklistCreate 
from datetime import datetime

def create_checklist(db: Session, checklist, user_id: int):
    if isinstance(checklist.items, str):
        try:
            import json
            items = json.loads(checklist.items)
        except json.JSONDecodeError:
            items = [checklist.items]
    else:
        items = checklist.items

    db_checklist = Checklist(
        title=checklist.title,
        items=items,
        owner_id=user_id,
    )
    db.add(db_checklist)
    db.commit()
    db.refresh(db_checklist)
    return db_checklist

def get_checklists(db: Session, user_id: int):
    return db.query(Checklist).filter(Checklist.owner_id == user_id).all()

def get_checklist(db: Session, checklist_id: int, user_id: int):
    return db.query(Checklist).filter(
        Checklist.id == checklist_id,
        Checklist.owner_id == user_id
    ).first()

def update_checklist(db: Session, checklist_id: int, updated: ChecklistCreate, user_id: int, is_pinned: Optional[bool] = None):
    checklist = db.query(Checklist).filter_by(id=checklist_id, owner_id=user_id).first()
    if not checklist:
        return None

    checklist.title = updated.title
    checklist.items = updated.items
    checklist.updated_at = datetime.now()

    if is_pinned is not None:
        checklist.is_pinned = is_pinned

    db.commit()
    db.refresh(checklist)
    return checklist

def delete_checklist(db: Session, checklist_id: int, user_id: int):
    checklist = db.query(Checklist).filter(Checklist.id == checklist_id, Checklist.owner_id == user_id).first()
    if not checklist:
        return False
    db.delete(checklist)
    db.commit()
    return True

