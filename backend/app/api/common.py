from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Literal
from backend.app.db.models import Note, Checklist, User
from backend.app.dependencies.auth import get_current_user, get_db
from backend.app.schemas.common import CombinedItem

router = APIRouter()

@router.get("/all", response_model=List[CombinedItem])
def get_all_items(
    sort_by: str = Query("created_newest", enum=[
        "created_newest", "created_oldest",
        "updated_newest", "updated_oldest",
        "title"
    ]),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    notes = db.query(Note).filter(Note.owner_id == user.id).all()
    checklists = db.query(Checklist).filter(Checklist.owner_id == user.id).all()

    combined = []

    for note in notes:
        combined.append(CombinedItem(
            id=note.id,
            type="note",
            title=note.title,
            content=note.content,
            created_at=note.created_at,
            updated_at=note.updated_at,
            is_pinned=note.is_pinned
        ))

    for checklist in checklists:
        combined.append(CombinedItem(
            id=checklist.id,
            type="checklist",
            title=checklist.title,
            items=checklist.items,
            created_at=checklist.created_at,
            updated_at=checklist.updated_at,
            is_pinned=checklist.is_pinned
        ))

    # Отдельно закреплённые и незакреплённые
    pinned = [item for item in combined if item.is_pinned]
    unpinned = [item for item in combined if not item.is_pinned]

    # Сортировка только незакреплённых
    if sort_by == "created_newest":
        unpinned.sort(key=lambda x: x.created_at, reverse=True)
    elif sort_by == "created_oldest":
        unpinned.sort(key=lambda x: x.created_at)
    elif sort_by == "updated_newest":
        unpinned = [item for item in unpinned if item.updated_at is not None]
        unpinned.sort(key=lambda x: x.updated_at, reverse=True)
    elif sort_by == "updated_oldest":
        unpinned = [item for item in unpinned if item.updated_at is not None]
        unpinned.sort(key=lambda x: x.updated_at)
    elif sort_by == "title":
        with_title = [item for item in unpinned if item.title]
        without_title = [item for item in unpinned if not item.title]
        with_title.sort(key=lambda x: x.title.lower())
        without_title.sort(key=lambda x: x.created_at, reverse=True)
        unpinned = with_title + without_title

    return pinned + unpinned

@router.get("/search", response_model=List[CombinedItem])
def search_items(
    query: str = Query(..., description="Text to search in title, content, or items."),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    notes = db.query(Note).filter(Note.owner_id == user.id).all()
    checklists = db.query(Checklist).filter(Checklist.owner_id == user.id).all()

    results = []
    query_lower = query.lower()

    for note in notes:
        if (
            (note.title and query_lower in note.title.lower()) or
            (note.content and query_lower in note.content.lower())
        ):
            results.append(CombinedItem(
                id=note.id,
                type="note",
                title=note.title,
                content=note.content,
                created_at=note.created_at,
                updated_at=note.updated_at,
                is_pinned=note.is_pinned
            ))

    for checklist in checklists:
        if (
            (checklist.title and query_lower in checklist.title.lower()) or
            (checklist.items and any(query_lower in item.lower() for item in checklist.items))
        ):
            results.append(CombinedItem(
                id=checklist.id,
                type="checklist",
                title=checklist.title,
                items=checklist.items,
                created_at=checklist.created_at,
                updated_at=checklist.updated_at,
                is_pinned=checklist.is_pinned
            ))

    return results

@router.post("/pin")
def pin_item(
    item_id: int = Query(...),
    item_type: Literal["note", "checklist"] = Query(...),
    pin: bool = Query(..., description="Pin (true) or unpin (false) the item."),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):

    if item_type == "note":
        item = db.query(Note).filter_by(id=item_id, owner_id=user.id).first()
    else:
        item = db.query(Checklist).filter_by(id=item_id, owner_id=user.id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")

    item.is_pinned = pin
    db.commit()

    return {"status": "pinned" if pin else "unpinned"}
