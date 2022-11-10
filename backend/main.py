from fastapi import FastAPI

from .database import SessionLocal, engine
from . import models, schemas
from .routers import users, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "hello to the root page"}