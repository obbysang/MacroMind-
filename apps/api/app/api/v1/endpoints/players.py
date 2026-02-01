from typing import Any, List
from fastapi import APIRouter, Depends

from app.api import deps
from app.models.user import User
from app.schemas.player import Player

router = APIRouter()

@router.get("/", response_model=List[Player])
async def read_players(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve players.
    """
    players = [
        {
            "id": 1,
            "name": "Zeus",
            "role": "Top Lane",
            "team": "T1",
            "rating": "S+",
            "kda": 4.2,
            "csm": 8.4,
            "kp": "62%",
            "stats": [
                {"label": "Laning Phase", "value": 94},
                {"label": "Teamfighting", "value": 88},
            ]
        },
        {
            "id": 2,
            "name": "Oner",
            "role": "Jungle",
            "team": "T1",
            "rating": "A",
            "kda": 3.8,
            "csm": 5.2,
            "kp": "71%",
            "stats": [
                {"label": "Pathing Efficiency", "value": 82},
                {"label": "Objective Control", "value": 89},
            ]
        },
        {
            "id": 3,
            "name": "Faker",
            "role": "Mid Lane",
            "team": "T1",
            "rating": "S",
            "kda": 5.1,
            "csm": 9.1,
            "kp": "68%",
            "stats": [
                {"label": "Roaming", "value": 91},
                {"label": "Macro Decision", "value": 98},
            ]
        }
    ]
    return players
