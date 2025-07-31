from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.app.crud.note import (
    create_note, get_notes, get_note, update_note, delete_note
)
from backend.app.schemas.note import NoteCreate, NoteUpdate, NoteOut
from backend.app.dependencies.auth import get_current_user, get_db
from backend.app.db.models import User

router = APIRouter()

@router.post("/notes", response_model=NoteOut)
def add_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return create_note(db, note, user.id)

@router.get("/notes", response_model=List[NoteOut])
def read_notes(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return get_notes(db, user.id)

@router.get("/notes/{note_id}", response_model=NoteOut)
def read_note(
    note_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    note = get_note(db, note_id, user.id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.put("/notes/{note_id}", response_model=NoteOut)
def edit_note(
    note_id: int,
    updated_note: NoteUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    note = update_note(db, note_id, updated_note, user.id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found or unauthorized")
    return note

@router.delete("/notes/{note_id}")
def remove_note(
    note_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    success = delete_note(db, note_id, user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found or unauthorized")
    return {"message": "Note deleted successfully"}
