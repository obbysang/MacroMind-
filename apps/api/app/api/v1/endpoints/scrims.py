from typing import Any, List, Optional
from datetime import datetime
import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.models.user import User
from app.models.scrim import Scrim
from app.schemas.scrim import ScrimCreate, ScrimUpdate, Scrim as ScrimSchema

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[ScrimSchema])
async def read_scrims(
    skip: int = 0,
    limit: int = 100,
    upcoming: Optional[bool] = Query(None, description="Filter by upcoming (True) or past (False) scrims"),
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve scrims.
    """
    logger.info(f"User {current_user.id} fetching scrims upcoming={upcoming}")
    query = select(Scrim)
    
    if upcoming is not None:
        if upcoming:
            query = query.where(Scrim.date >= datetime.now())
            query = query.order_by(Scrim.date.asc())
        else:
            query = query.where(Scrim.date < datetime.now())
            query = query.order_by(Scrim.date.desc())
    else:
        query = query.order_by(Scrim.date.desc())
        
    query = query.offset(skip).limit(limit)
    
    result = await db.execute(query)
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
    logger.info(f"User {current_user.id} creating scrim vs {scrim_in.team_name}")
    scrim = Scrim(**scrim_in.dict(), created_by_id=current_user.id)
    db.add(scrim)
    await db.commit()
    await db.refresh(scrim)
    return scrim

@router.put("/{scrim_id}", response_model=ScrimSchema)
async def update_scrim(
    scrim_id: int,
    scrim_in: ScrimUpdate,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a scrim.
    """
    logger.info(f"User {current_user.id} updating scrim {scrim_id}")
    result = await db.execute(select(Scrim).where(Scrim.id == scrim_id))
    scrim = result.scalar_one_or_none()
    
    if not scrim:
        raise HTTPException(status_code=404, detail="Scrim not found")
        
    update_data = scrim_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(scrim, field, value)
        
    db.add(scrim)
    await db.commit()
    await db.refresh(scrim)
    return scrim

@router.delete("/{scrim_id}", response_model=ScrimSchema)
async def delete_scrim(
    scrim_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a scrim.
    """
    logger.info(f"User {current_user.id} deleting scrim {scrim_id}")
    result = await db.execute(select(Scrim).where(Scrim.id == scrim_id))
    scrim = result.scalar_one_or_none()
    
    if not scrim:
        raise HTTPException(status_code=404, detail="Scrim not found")
        
    await db.delete(scrim)
    await db.commit()
    return scrim
