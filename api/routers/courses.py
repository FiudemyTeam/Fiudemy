from fastapi import APIRouter, HTTPException, Response
from sqlmodel import Session, select
from typing import List

from models.courses import Course, CourseCreate, CourseRead, CourseUserRate
from dependencies import UserDependency
from db import engine

router = APIRouter(
    prefix="/courses",
    tags=["courses"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[CourseRead])
async def get_courses():
    with Session(engine) as session:
        results = session.exec(select(Course))
        return results.all()


@router.get("/{id}", response_model=CourseRead)
async def get_course(id: int):
    with Session(engine) as session:
        course = session.get(Course, id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course


@router.post("/", response_model=CourseRead)
def post_course(course: CourseCreate):
    with Session(engine) as session:
        session.add(new_course := Course.from_orm(course))
        session.commit()
        session.refresh(new_course)
        return new_course


@router.post("/{id}/rate", response_model=CourseUserRate, status_code=200)
def upsert_course_rate(id: int,
                       rate: int,
                       user: UserDependency,
                       response: Response):
    with Session(engine) as session:
        # Check if rate already exists
        statement = select(CourseUserRate).where(
            CourseUserRate.user_id == user.id,
            CourseUserRate.course_id == id)
        course_rate = session.exec(statement).first()

        # If not, create a new one
        if course_rate is None:
            course_rate = CourseUserRate(user_id=user.id,
                                         course_id=id,
                                         rate=rate)
            response.status_code = 201
        # Else, update the existing one
        else:
            course_rate.rate = rate

        session.add(course_rate)
        session.commit()
        session.refresh(course_rate)

        return course_rate
