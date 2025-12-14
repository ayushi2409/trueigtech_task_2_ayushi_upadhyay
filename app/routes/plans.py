from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.plan import Plan
from app.dependencies import get_current_user

router = APIRouter(prefix="/plans", tags=["Plans"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_plan(
    title: str,
    description: str,
    price: float,
    duration: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "TRAINER":
        raise HTTPException(403, "Only trainers can create plans")

    plan = Plan(
        title=title,
        description=description,
        price=price,
        duration=duration,
        trainer_id=user.id
    )
    db.add(plan)
    db.commit()
    return plan

@router.get("/")
def view_plans(db: Session = Depends(get_db)):
    return db.query(Plan).all()
