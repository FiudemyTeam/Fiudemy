from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
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


class CourseRateRequest(BaseModel):
    course_id: int
    rate: int


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


@router.post("/{id}/rate", response_model=CourseUserRate)
def rate_course(course_rate_request: CourseRateRequest,
                user: UserDependency):
    course_user_rate = CourseUserRate(user_id=user.id,
                                      course_id=course_rate_request.course_id,
                                      rate=course_rate_request.rate)
    with Session(engine) as session:
        session.add(course_user_rate)
        session.commit()
        session.refresh(course_user_rate)
        print("Created CourseUserRate: ", course_user_rate)
        return course_user_rate


@router.put("/{id}/rate", response_model=CourseUserRate)
def update_course_rate(course_rate_request: CourseRateRequest,
                       user: UserDependency):
    with Session(engine) as session:
        course_user_rate_statement = select(CourseUserRate).where(
            CourseUserRate.user_id == user.id and
            CourseUserRate.course_id == course_rate_request.course_id)
        results = session.exec(course_user_rate_statement)
        found_course_user_rate = results.one()
        print("Found CourseUserRate to update:", found_course_user_rate)

        found_course_user_rate.rate = course_rate_request.rate
        session.add(found_course_user_rate)
        session.commit()
        session.refresh(found_course_user_rate)
        print("Updated CourseUserRate:", found_course_user_rate)
        return found_course_user_rate
