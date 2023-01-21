from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from pydantic import EmailStr

from backend.src.database import get_db
import backend.src.dependencies as glob_dependencies
import backend.src.utils as glob_utils
import backend.src.auth.service as auth_service
import backend.src.auth.exceptions as auth_exceptions
import backend.src.course.service as course_service
import backend.src.user.schemas as schemas
import backend.src.user.exceptions as exceptions
import backend.src.user.service as service

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

# Get profile page
@router.get(
    "/profile/{email}",
    response_model=schemas.UserProfileOut,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def get_user_profile(email: EmailStr, db: Session=Depends(get_db)):
    user = auth_service.get_user_by_email(db, email)
    if not user:
        raise exceptions.UserNotFoundException(email)
    reviews = service.get_reviews_by_user_email(db, email)
    reviews_dict_list = glob_utils.sql_obj_list_to_dict_list(reviews)
    response = {
        "email": user.email,
        "entered_year": user.entered_year,
        "major": user.major,
        "reviews": reviews_dict_list
    }
    
    return response
    

# Update profile page (password)
@router.patch(
    "/users/{email}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(glob_dependencies.get_current_user)]
)
async def update_password(email: EmailStr, update_info: schemas.UpdatePasswordIn, db: Session=Depends(get_db)):
    update_info = update_info.dict()
    user = auth_service.authenticate_user(db, email, update_info['old_password'])
    if not user:
        raise exceptions.WrongPasswordException()
    service.update_password(db, user, update_info['new_password'])
    