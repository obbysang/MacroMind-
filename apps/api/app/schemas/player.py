from pydantic import BaseModel
from typing import List

class PlayerStat(BaseModel):
    label: str
    value: float

class Player(BaseModel):
    id: int
    name: str
    role: str
    team: str
    rating: str
    kda: float
    csm: float
    kp: str  # Kept as string to match "62%" format or similar, or could be float. Let's use string for now to be safe with current FE
    stats: List[PlayerStat]
