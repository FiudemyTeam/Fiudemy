from pydantic import BaseModel
from sqlmodel import Session, select, and_
from sqlalchemy.sql import functions
from fastapi import APIRouter, HTTPException, Response, Depends
from typing import List, Optional

from models.courses import (
    Course, CourseCreate, CourseRead, CourseUserRate,
    CourseUserFavorite
)
from dependencies import UserDependency, get_session


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
    session: Session = Depends(get_session)
):
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
async def get_course(id: int,
                     session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.get("/list/favs", response_model=List[int])
async def get_fav_courses(user: UserDependency,
                          session: Session = Depends(get_session)):
    query = select(CourseUserFavorite.course_id).where(
        CourseUserFavorite.user_id == user.id
    )
    results = session.exec(query)

    course_ids = [row for row in results]
    return course_ids


@router.post("/", response_model=CourseRead)
def post_course(course: CourseCreate,
                session: Session = Depends(get_session)):
    session.add(new_course := Course.from_orm(course))
    session.commit()
    session.refresh(new_course)
    return new_course


@router.post("/{id}/rate", response_model=CourseUserRate, status_code=200)
def upsert_course_rate(id: int,
                       rate: int,
                       user: UserDependency,
                       response: Response,
                       session: Session = Depends(get_session)):
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


@router.post("/{id}/fav", response_model=dict)
def fav_course(course_fav_request: CourseFavRequest,
               user: UserDependency,
               session: Session = Depends(get_session)):
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
