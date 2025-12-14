from fastapi import FastAPI
from app.database import Base, engine

from fastapi.middleware.cors import CORSMiddleware

from app.models.user import User
from app.models.plan import Plan
from app.models.subscription import Subscription
from app.models.follow import Follow

from app.routes.auth import router as auth_router
from app.routes.plans import router as plans_router
from app.routes.subscriptions import router as sub_router
from app.routes.follows import router as follow_router
from app.routes.feed import router as feed_router

app = FastAPI(title="FitPlanHub API")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite frontend
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],   # VERY IMPORTANT
    allow_headers=["*"],   # VERY IMPORTANT
)


app.include_router(auth_router)
app.include_router(plans_router)
app.include_router(sub_router)
app.include_router(follow_router)
app.include_router(feed_router)

@app.get("/")
def root():
    return {"message": "FitPlanHub Backend Running"}

