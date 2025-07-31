from sqlalchemy.orm import Session
from backend.app.db.models import Note
from backend.app.schemas.note import NoteUpdate
from datetime import datetime

def get_notes(db: Session, user_id: int):
    return db.query(Note).filter(Note.owner_id == user_id).all()

def create_note(db: Session, note, user_id: int):
    db_note = Note(
        title=note.title,
        content=note.content,
        owner_id=user_id
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_note(db: Session, note_id: int, user_id: int):
    note = db.query(Note).filter(Note.id == note_id, Note.owner_id == user_id).first()
    if note is None:
        return None
    return note

def update_note(db: Session, note_id: int, updated_note: NoteUpdate, user_id: int):
    note = db.query(Note).filter(Note.id == note_id, Note.owner_id == user_id).first()
    if not note:
        return None

    title_changed = updated_note.title != note.title
    content_changed = updated_note.content != note.content
    pinned_changed = updated_note.is_pinned != note.is_pinned

    if title_changed or content_changed:
        note.title = updated_note.title
        note.content = updated_note.content
        note.updated_at = datetime.now()

    if pinned_changed:
        note.is_pinned = updated_note.is_pinned

    db.commit()
    db.refresh(note)
    return note

def delete_note(db: Session, note_id: int, user_id: int):
    note = db.query(Note).filter(Note.id == note_id, Note.owner_id == user_id).first()
    if not note:
        return False
    db.delete(note)
    db.commit()
    return True
