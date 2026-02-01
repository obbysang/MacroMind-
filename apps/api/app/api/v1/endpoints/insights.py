from typing import Any, List
from fastapi import APIRouter, Depends

from app.api import deps
from app.models.user import User
from app.schemas.insight import Insight

router = APIRouter()

@router.get("/", response_model=List[Insight])
async def read_insights(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve coaching insights.
    """
    # Mock data that matches the frontend requirements
    insights = [
        {
            "id": "1",
            "time": "14:32",
            "game": "Game 3",
            "role": "Jungle",
            "title": "Overextension Top Lane",
            "description": "Jungler showed on vision top side while Dragon spawned. Enemy team immediately started objective.",
            "impactValue": "-15% Pressure",
            "impactLabel": "Map Control",
            "type": "negative",
        },
        {
            "id": "2",
            "time": "08:15",
            "game": "Game 3",
            "role": "Support",
            "title": "Perfect Roam Timer",
            "description": "Support roam aligned with Mid wave crash. Secured first blood on enemy Mid laner.",
            "impactValue": "+12% Tempo",
            "impactLabel": "Mid Priority",
            "type": "positive",
        },
        {
            "id": "3",
            "time": "22:05",
            "game": "Game 2",
            "role": "Team",
            "title": "Baron Setup Efficiency",
            "description": "Vision clearing speed around Baron pit was 12s (League Avg: 15s). Good prep.",
            "impactValue": "Optimal",
            "impactLabel": "Vision Score",
            "type": "neutral",
        },
        {
            "id": "4",
            "time": "31:40",
            "game": "Game 1",
            "role": "ADC",
            "title": "Recall Timing Sync",
            "description": "ADC recalled 8s later than team, causing desync for Dragon fight setup.",
            "impactValue": "High Risk",
            "impactLabel": "Teamfight",
            "type": "negative",
        },
    ]
    return insights
