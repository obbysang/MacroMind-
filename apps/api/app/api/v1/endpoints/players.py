from typing import Any
from fastapi import APIRouter, Depends

from app.api import deps
from app.models.user import User

router = APIRouter()

@router.get("/")
async def read_players(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve players.
    """
    return [
        {"id": 1, "ign": "Faker", "role": "Mid", "team": "T1"},
        {"id": 2, "ign": "Blaber", "role": "Jungle", "team": "C9"},
    ]
