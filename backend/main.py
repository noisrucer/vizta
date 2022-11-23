from fastapi import FastAPI
from fastapi import APIRouter, status, HTTPException, Depends
from email_validator import validate_email, EmailNotValidError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from .database import SessionLocal, engine
from . import models, schemas
from .routers import users, auth

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(EmailNotValidError)
async def email_validation_handler(request, exc):
    return JSONResponse(detail="You must provide a valid email address type.")

app.include_router(users.router)
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "hello to the root page"}