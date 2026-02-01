from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    upload_date = Column(DateTime)
    uploaded_by_id = Column(Integer, ForeignKey("users.id"))
    processed = Column(Boolean, default=False)
    
    # Metadata parsed from replay
    team1 = Column(String, nullable=True)
    team2 = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    outcome = Column(String, nullable=True)
    game_version = Column(String, nullable=True)
