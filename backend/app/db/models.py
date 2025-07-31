from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func, Boolean
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from backend.app.db.base import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="user")

    notes = relationship("Note", back_populates="owner")
    checklists = relationship("Checklist", back_populates="owner")


class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=True)
    content = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=False)
    is_pinned = Column(Boolean, default=False)

    owner = relationship("User", back_populates="notes")


class Checklist(Base):
    __tablename__ = "checklists"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    items = Column(ARRAY(String))
    owner_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=False)
    is_pinned = Column(Boolean, default=False)

    owner = relationship("User", back_populates="checklists")
