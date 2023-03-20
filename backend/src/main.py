from fastapi import FastAPI
from email_validator import EmailNotValidError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from backend.src.database import engine
from backend.src.auth.router import router as auth_router
from backend.src.course.router import router as course_router
from backend.src.user.router import router as user_router
from backend.src.visualization.router import router as visualization_router
import backend.src.models as glob_models
import backend.src.auth.models as auth_models
import backend.src.course.models as course_models
import backend.src.user.models as user_models

glob_models.Base.metadata.create_all(bind=engine)
auth_models.Base.metadata.create_all(bind=engine)
course_models.Base.metadata.create_all(bind=engine)
# user_models.Base.metadata.create_all(bind=engine)


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
app.include_router(course_router)
app.include_router(user_router)
app.include_router(visualization_router)

@app.get("/")
async def root():
    return {"message": "hello to the root"}