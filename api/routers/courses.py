from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select, and_
from sqlalchemy.sql import functions
from typing import List, Optional

from models.courses import Course, CourseCreate, CourseRead, CourseUserRate, CourseUserFavorite
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

class CourseFavRequest(BaseModel):
    course_id: int

@router.get("/", response_model=List[CourseRead])
async def get_courses(
    user: UserDependency,
    category: Optional[int] = None,
    searchString: Optional[str] = None,
    rate: Optional[int] = None,
    favorite: Optional[bool] = None,
):
    with Session(engine) as session:
        query = select(Course)
        filters = []

        if category:
            filters.append(Course.category_id == category)

        if searchString:
            filters.append(Course.name.like(f"%{searchString}%"))

        if rate is not None:
            filters.append(Course.user_rates.any(CourseUserRate.rate == rate))

        if favorite:
            filters.append(Course.user_favorites.any(
                and_(CourseUserFavorite.favorite == favorite, CourseUserFavorite.user_id == user.id)))

        query = query.where(and_(*filters))
        results = session.exec(query)
        return results.all()


@router.get("/{id}", response_model=CourseRead)
async def get_course(id: int):
    with Session(engine) as session:
        course = session.get(Course, id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course

@router.get("/list/favs", response_model=List[int]) 
async def get_fav_courses(user: UserDependency):
    with Session(engine) as session:
        query = select(CourseUserFavorite.course_id).where(
            CourseUserFavorite.user_id == user.id
        )
        results = session.exec(query)

        course_ids = [row for row in results]
        return course_ids

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

@router.post("/{id}/fav", response_model=dict)
def fav_course(course_fav_request: CourseFavRequest, user: UserDependency):
    with Session(engine) as session:
        # Buscar el registro existente por course_id y user.id
        existing_fav = session.query(CourseUserFavorite).filter_by(
            user_id=user.id, course_id=course_fav_request.course_id
        ).first()

        if existing_fav:
            # Si existe un registro, bórralo
            session.delete(existing_fav)
            session.commit()
            return {"message": "Course removed from favorites."}
        else:
            # Si no existe, crea un nuevo registro
            course_user_fav = CourseUserFavorite(
                user_id=user.id,
                course_id=course_fav_request.course_id,
                favorite=True
            )
            session.add(course_user_fav)
            session.commit()
            session.refresh(course_user_fav)
            return course_user_fav
