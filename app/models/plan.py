from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    price = Column(Float)
    duration = Column(String)
    trainer_id = Column(Integer, ForeignKey("users.id"))
