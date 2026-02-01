from pydantic import BaseModel
from typing import Literal

class InsightBase(BaseModel):
    time: str
    game: str
    role: str
    title: str
    description: str
    impactValue: str
    impactLabel: str
    type: Literal["positive", "negative", "neutral"]

class Insight(InsightBase):
    id: str

    class Config:
        from_attributes = True
