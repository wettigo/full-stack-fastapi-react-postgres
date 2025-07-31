from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List

from backend.app.schemas.checklist import ChecklistCreate, ChecklistOut
from backend.app.crud.checklist import (
    create_checklist, get_checklists, get_checklist,
    update_checklist, delete_checklist
)
from backend.app.db.models import User
from backend.app.dependencies.auth import get_current_user, get_db

router = APIRouter()

@router.post("/checklists", response_model=ChecklistOut)
def add_checklist(
    checklist: ChecklistCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return create_checklist(db, checklist, user.id)

@router.get("/checklists", response_model=List[ChecklistOut])
def read_checklists(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return get_checklists(db, user.id)

@router.get("/checklists/{checklist_id}", response_model=ChecklistOut)
def read_checklist(
    checklist_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    checklist = get_checklist(db, checklist_id, user.id)
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    return checklist

@router.put("/checklists/{checklist_id}", response_model=ChecklistOut)
async def edit_checklist(
    checklist_id: int,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    body = await request.json()
    is_pinned = body.get("is_pinned")

    updated = ChecklistCreate(**body)

    checklist = update_checklist(db, checklist_id, updated, user.id, is_pinned)
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found or unauthorized")
    return checklist

@router.delete("/checklists/{checklist_id}")
def remove_checklist(
    checklist_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    success = delete_checklist(db, checklist_id, user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Checklist not found or unauthorized")
    return {"message": "Checklist deleted successfully"}
