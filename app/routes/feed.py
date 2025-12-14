from fastapi import APIRouter, Depends
from app.database import SessionLocal
from app.models.follow import Follow
from app.models.plan import Plan
from app.dependencies import get_current_user

router = APIRouter(prefix="/feed", tags=["Feed"])

@router.get("/")
def feed(user=Depends(get_current_user)):
    db = SessionLocal()
    follows = db.query(Follow).filter(Follow.user_id == user.id).all()
    trainer_ids = [f.trainer_id for f in follows]
    return db.query(Plan).filter(Plan.trainer_id.in_(trainer_ids)).all()
