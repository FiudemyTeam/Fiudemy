from sqlmodel import Session, select

from models import User
from db import engine


def select_all_users():
    with Session(engine) as session:
        return session.exec(select(User)).all()


def find_user(name):
    with Session(engine) as session:
        return session.exec(select(User).where(User.username == name)).first()
    
def update_user(user):
    with Session(engine) as session:
        session.merge(user)
        session.commit()