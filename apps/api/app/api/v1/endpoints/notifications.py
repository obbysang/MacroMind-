from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.api import deps
from app.db.session import get_db
from app.models.notification import Notification
from app.models.user import User
from app.schemas.notification import (
    Notification as NotificationSchema,
    NotificationCreate,
    NotificationUpdate,
)

router = APIRouter()

@router.post("/", response_model=NotificationSchema)
async def create_notification(
    *,
    db: AsyncSession = Depends(get_db),
    notification_in: NotificationCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create a notification (Test/System usage).
    """
    notification = Notification(
        **notification_in.model_dump(),
        user_id=current_user.id
    )
    db.add(notification)
    await db.commit()
    await db.refresh(notification)
    return notification

@router.get("/", response_model=List[NotificationSchema])
async def read_notifications(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve notifications for current user.
    """
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    notifications = result.scalars().all()
    return notifications

@router.put("/{id}/read", response_model=NotificationSchema)
async def mark_notification_read(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Mark notification as read.
    """
    result = await db.execute(select(Notification).where(Notification.id == id, Notification.user_id == current_user.id))
    notification = result.scalars().first()
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.is_read = True
    db.add(notification)
    await db.commit()
    await db.refresh(notification)
    return notification
