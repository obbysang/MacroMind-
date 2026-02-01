from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.models.user import User
from app.models.scrim import Scrim
from app.schemas.scrim import ScrimCreate, Scrim as ScrimSchema

router = APIRouter()

@router.get("/", response_model=List[ScrimSchema])
async def read_scrims(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve scrims.
    """
    result = await db.execute(select(Scrim).offset(skip).limit(limit))
    scrims = result.scalars().all()
    return scrims

@router.post("/", response_model=ScrimSchema)
async def create_scrim(
    scrim_in: ScrimCreate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new scrim.
    """
    scrim = Scrim(**scrim_in.dict(), created_by_id=current_user.id)
    db.add(scrim)
    await db.commit()
    await db.refresh(scrim)
    return scrim
