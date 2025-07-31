from pydantic import BaseModel, Field
from typing import Annotated, Literal

class UserCreate(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=20)]
    password: Annotated[str, Field(min_length=6, max_length=32)]
    role: Literal["user", "admin"] = "user"

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str 
    role: str

    class Config:
        from_attributes = True
