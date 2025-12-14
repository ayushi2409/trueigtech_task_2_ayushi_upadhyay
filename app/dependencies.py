from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from app.core.security import SECRET_KEY, ALGORITHM
from app.database import SessionLocal
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id = payload.get("user_id")

    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(401, "Invalid token")

    return user
