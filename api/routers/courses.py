from fastapi import APIRouter, HTTPException, Response, Depends
from sqlmodel import select, and_, Session
from typing import List, Optional

from models.courses import (
    Course, CourseCreate, CourseRead, CourseUserRate,
    CourseUserFavorite, CourseReadWithMaterials
)
from dependencies import UserDependency, get_session


router = APIRouter(
    prefix="/courses",
    tags=["courses"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[CourseRead])
async def get_courses(
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
            CourseUserFavorite.favorite == favorite))

    query = query.where(and_(*filters))
    results = session.exec(query)
    return results.all()


@router.get("/{id}", response_model=CourseReadWithMaterials)
async def get_course(id: int,
                     session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
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
