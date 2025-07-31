from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NoteCreate(BaseModel):
    title: Optional[str] = None
    content: str

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: str
    is_pinned: Optional[bool] = None
    
class NoteOut(BaseModel):
    id: int
    title: Optional[str] = None
    content: str
    is_pinned: bool

    pinned_at: Optional[datetime] = None

    class Config:
        from_attributes = True
