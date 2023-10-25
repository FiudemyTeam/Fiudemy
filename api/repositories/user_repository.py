from sqlmodel import Session, select

from db import engine
from models import User


def select_all_users():
    with Session(engine) as session:
        return session.exec(select(User)).all()


def find_user(name):
    with Session(engine) as session:
        return session.exec(select(User).where(User.username == name)).first()