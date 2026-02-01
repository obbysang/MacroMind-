from typing import Any, List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import shutil
import os
from datetime import datetime

from app.api import deps
from app.models.user import User
from app.models.match import Match
from app.schemas.match import Match as MatchSchema

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[MatchSchema])
async def read_matches(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve matches.
    """
    result = await db.execute(select(Match).offset(skip).limit(limit))
    matches = result.scalars().all()
    return matches

@router.post("/upload", response_model=MatchSchema)
async def upload_replay(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Upload a replay file.
    """
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    # In a real app, we would parse the replay file here to extract metadata
    # For now, we create a Match record with some placeholder/inferred data
    
    match = Match(
        filename=file.filename,
        upload_date=datetime.utcnow(),
        uploaded_by_id=current_user.id,
        processed=False, # Would be set to True after async processing
        team1="Unknown",
        team2="Unknown",
        outcome="Pending"
    )
    
    db.add(match)
    await db.commit()
    await db.refresh(match)
    return match

@router.get("/{match_id}", response_model=MatchSchema)
async def read_match(
    match_id: int,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve match details.
    """
    result = await db.execute(select(Match).where(Match.id == match_id))
    match = result.scalars().first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match
