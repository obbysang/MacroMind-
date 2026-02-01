from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class NotificationBase(BaseModel):
    title: str
    message: str
    type: str = "info"
    is_read: bool = False

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None

class NotificationInDBBase(NotificationBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Notification(NotificationInDBBase):
    pass
