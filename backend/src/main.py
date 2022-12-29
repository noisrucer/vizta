from fastapi import FastAPI
from email_validator import  EmailNotValidError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.src.database import engine
from backend.src.auth.router import router as auth_router
from backend.src.courses.router import router as courses_router
import backend.src.models as glob_models
import backend.src.auth.models as auth_models
import backend.src.courses.models as courses_models

glob_models.Base.metadata.create_all(bind=engine)
auth_models.Base.metadata.create_all(bind=engine)
courses_models.Base.metadata.create_all(bind=engine)


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

app.include_router(auth_router)
app.include_router(courses_router)

@app.get("/")
async def root():
    return {"message": "hello to the root page"}