from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class MatchBase(BaseModel):
    filename: str
    team1: Optional[str] = None
    team2: Optional[str] = None
    duration: Optional[str] = None
    outcome: Optional[str] = None
    game_version: Optional[str] = None
    processed: bool = False

class MatchCreate(MatchBase):
    pass

class Match(MatchBase):
    id: int
    upload_date: datetime
    uploaded_by_id: int

    class Config:
        from_attributes = True
