from pydantic import BaseModel
from typing import List, Literal, Optional
from datetime import datetime

class CombinedItem(BaseModel):
    id: int
    type: Literal["note", "checklist"]
    title: Optional[str]
    content: Optional[str] = None
    items: Optional[List[str]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_pinned: bool = False

    class Config:
        from_attributes = True
