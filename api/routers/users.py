from fastapi import APIRouter, HTTPException, Depends
from auth import AuthHandler
from sqlmodel import Session

from models.users import UserInput, User, UserLogin, UserRead, UserUpdate
from repositories.user_repository import select_all_users, find_user
from dependencies import UserDependency, get_session

user_router = APIRouter(tags=['users'])
auth_handler = AuthHandler()


@user_router.post('/registration', status_code=201,
                  description='Register new user')
def register(user: UserInput, session: Session = Depends(get_session)):
    users = select_all_users(session)
    if any(x.username == user.username for x in users):
        raise HTTPException(status_code=400, detail='Username is taken')
    hashed_pwd = auth_handler.get_password_hash(user.password)
    u = User(username=user.username, password=hashed_pwd, email=user.email)
    session.add(u)
    session.commit()
    session.refresh(u)
    return u


@user_router.post('/login')
def login(user: UserLogin, session: Session = Depends(get_session)):
    user_found = find_user(session, user.username)
    if not user_found:
        raise HTTPException(status_code=401,
                            detail='Invalid username and/or password')
    verified = auth_handler.verify_password(user.password, user_found.password)
    if not verified:
        raise HTTPException(status_code=401,
                            detail='Invalid username and/or password')
    token = auth_handler.encode_token(user_found.username)
    return {'token': token}


@user_router.get('/users/me', response_model=UserRead)
def get_current_user(user: UserDependency):
    return user


@user_router.patch('/users/me', response_model=UserRead)
def update_current_user(new_user_data: UserUpdate,
                        existing_user: UserDependency,
                        session: Session = Depends(get_session)):
    new_user_data = new_user_data.dict(exclude_unset=True)
    for key, value in new_user_data.items():
        setattr(existing_user, key, value)
    session.add(existing_user)
    session.commit()
    session.refresh(existing_user)
    return existing_user
