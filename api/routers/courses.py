from fastapi import APIRouter, HTTPException, Response, Depends
from pydantic import BaseModel
from sqlmodel import Session, select, and_
from typing import List, Optional

from models.users import User
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


@router.get("/", response_model=List[CourseRead])
async def get_courses(
    user: UserDependency,
    category: Optional[int] = None,
    searchString: Optional[str] = None,
    rate: Optional[int] = None,
    favorite: Optional[bool] = None,
    session: Session = Depends(get_session)
):
    is_favorite_sub = select(Course.user_favorites.any(User.id == user.id)).label("is_favorite")
    query = select(Course, is_favorite_sub)
    filters = []

    if category:
        filters.append(Course.category_id == category)

    if searchString:
        filters.append(Course.name.like(f"%{searchString}%"))

    if rate is not None:
        filters.append(Course.user_rates.any(CourseUserRate.rate == rate))

    if favorite:
        filters.append(Course.user_favorites.any(User.id == user.id))

    query = query.where(and_(*filters))
    results = session.exec(query)

    courses = []
    for course, is_favorite in results:
        course = CourseRead.from_orm(course)
        course.is_favorite = is_favorite
        courses.append(course)
    return courses


@router.get("/{id}", response_model=CourseRead)
async def get_course(id: int,
                     user: UserDependency,
                     session: Session = Depends(get_session)):
    is_favorite_sub = select(Course.user_favorites.any(User.id == user.id)).label("is_favorite")
    query = select(Course, is_favorite_sub).where(Course.id == id)
    (course, is_favorite) = session.exec(query).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    course = CourseRead.from_orm(course)
    course.is_favorite = is_favorite
    return course


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
                       comment: str,
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
                                     rate=rate,
                                     comment=comment)
        response.status_code = 201
    # Else, update the existing one
    else:
        course_rate.rate = rate
        course_rate.comment = comment

    session.add(course_rate)
    session.commit()
    session.refresh(course_rate)
    return course_rate


@router.post("/{id}/favorite", response_model=dict)
def favorite_course(id: int,
                    user: UserDependency,
                    session: Session = Depends(get_session)):
    existing_fav = session.query(CourseUserFavorite).filter_by(user_id=user.id,
                                                               course_id=id).first()
    if not existing_fav:
        course_user_fav = CourseUserFavorite(
            user_id=user.id,
            course_id=id
        )
        session.add(course_user_fav)
        session.commit()
    return {"is_favorite": True}


@router.delete("/{id}/favorite", response_model=dict)
def unfavorite_course(id: int,
                      user: UserDependency,
                      session: Session = Depends(get_session)):
    existing_fav = session.query(CourseUserFavorite).filter_by(user_id=user.id,
                                                               course_id=id).first()
    if existing_fav:
        session.delete(existing_fav)
        session.commit()
    return {"is_favorite": False}
