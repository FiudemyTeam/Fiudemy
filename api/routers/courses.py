from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from typing import List

from models import Course, CourseCreate, CourseRead

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
async def get_course(id: str):
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
