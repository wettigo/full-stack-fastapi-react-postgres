from pydantic import BaseModel
from typing import List, Optional

class ChecklistCreate(BaseModel):
    title: Optional[str] = None
    items: List[str]

class ChecklistOut(BaseModel):
    id: int
    title: Optional[str] = None
    items: List[str]
    is_pinned: bool

    class Config:
        from_attributes = True
