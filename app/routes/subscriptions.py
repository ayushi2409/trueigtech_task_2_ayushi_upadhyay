from fastapi import APIRouter, Depends
from app.database import SessionLocal
from app.models.subscription import Subscription
from app.dependencies import get_current_user

router = APIRouter(prefix="/subscribe", tags=["Subscriptions"])

@router.post("/{plan_id}")
def subscribe(plan_id: int, user=Depends(get_current_user)):
    db = SessionLocal()
    sub = Subscription(user_id=user.id, plan_id=plan_id)
    db.add(sub)
    db.commit()
    return {"message": "Subscribed"}
