from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "fitplanhub-secret"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=1)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
