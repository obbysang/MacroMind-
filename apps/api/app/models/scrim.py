from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base

class Scrim(Base):
    __tablename__ = "scrims"

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String, index=True)
    date = Column(DateTime)
    notes = Column(String, nullable=True)
    is_confirmed = Column(Boolean, default=False)
    created_by_id = Column(Integer, ForeignKey("users.id"))

    # relationships if needed in future
    # created_by = relationship("User", back_populates="scrims")
