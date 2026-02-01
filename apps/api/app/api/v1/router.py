from fastapi import APIRouter

from app.api.v1.endpoints import login, users, matches, players, insights, scrims

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(matches.router, prefix="/matches", tags=["matches"])
api_router.include_router(players.router, prefix="/players", tags=["players"])
api_router.include_router(insights.router, prefix="/insights", tags=["insights"])
api_router.include_router(scrims.router, prefix="/scrims", tags=["scrims"])
