from fastapi import Depends, HTTPException, status
from typing import Annotated
from auth import auth_handler
from repositories.user_repository import find_user
from models.users import User


def get_current_user(decoded_token: str = Depends(auth_handler.auth_wrapper)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials'
    )
    username = decoded_token
    if username is None:
        raise credentials_exception
    user = find_user(username)
    if user is None:
        raise credentials_exception
    return user


UserDependency = Annotated[User, Depends(get_current_user)]
