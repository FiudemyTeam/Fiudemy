from sqlmodel import SQLModel, create_engine, Session
from models import Course

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)


def seed_db():
    courses = [
        Course(name="Python Programming for Beginners", description="Learn Python Programming with ease!"),
        Course(name="Python Programming for Intermediates", description="Take your Python skills to the next level!"),
        Course(name="Python Programming for Experts", description="Become an expert in Python Programming!"),
    ]
    with Session(engine) as session:
        for course in courses:
            session.add(course)
        session.commit()
