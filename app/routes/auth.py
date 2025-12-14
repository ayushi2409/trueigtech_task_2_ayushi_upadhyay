from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(name: str, email: str, password: str, role: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email already exists")

    user = User(
        name=name,
        email=email,
        password=hash_password(password),
        role=role.upper()
    )
    db.add(user)
    db.commit()
    return {"message": "Signup successful"}

@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(401, "Invalid credentials")

    token = create_access_token({"user_id": user.id, "role": user.role})
    return {"access_token": token}
