from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ScrimBase(BaseModel):
    team_name: str
    date: datetime
    notes: Optional[str] = None
    is_confirmed: bool = False

class ScrimCreate(ScrimBase):
    pass

class ScrimUpdate(BaseModel):
    team_name: Optional[str] = None
    date: Optional[datetime] = None
    notes: Optional[str] = None
    is_confirmed: Optional[bool] = None

class Scrim(ScrimBase):
    id: int
    created_by_id: int

    class Config:
        from_attributes = True
