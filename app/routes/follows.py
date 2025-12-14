from fastapi import APIRouter, Depends
from app.database import SessionLocal
from app.models.follow import Follow
from app.dependencies import get_current_user

router = APIRouter(prefix="/follow", tags=["Follow"])

@router.post("/{trainer_id}")
def follow(trainer_id: int, user=Depends(get_current_user)):
    db = SessionLocal()
    follow = Follow(user_id=user.id, trainer_id=trainer_id)
    db.add(follow)
    db.commit()
    return {"message": "Trainer followed"}
