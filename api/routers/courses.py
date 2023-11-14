from typing import List, Optional

from dependencies import UserDependency, get_session
from fastapi import APIRouter, HTTPException, Response, Depends
from models.course_material_views import CourseMaterialView
from models.course_materials import CourseMaterial, CourseMaterialCreate
from models.course_subscriptions import CourseUserSubscription
from models.courses import (
    Course, CourseCreate, CourseRead, CourseUserRate,
    CourseUserFavorite, Category, CourseReadWithMaterials
)
from models.users import User
from sqlmodel import Session, select, and_

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
    is_favorite_sub = select(Course.user_favorites.any(
        User.id == user.id)).label("is_favorite")
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
        course.total_subscriptions = len(session.query(CourseUserSubscription).filter_by(course_id=course.id).all())
        course.course_materials.sort(key=lambda x: x.order, reverse=False)

        courses.append(course)

    return courses


@router.get("/{id}", response_model=CourseRead)
async def get_course(id: int,
                     user: UserDependency,
                     session: Session = Depends(get_session)):
    is_favorite_sub = select(Course.user_favorites.any(
        User.id == user.id)).label("is_favorite")
    is_subscribed_sub = select(Course.user_subscriptions.any(
        User.id == user.id)).label("is_subscribed")
    course_total_subscriptions = len(session.query(CourseUserSubscription).filter_by(course_id=id).all())
    viewed_course_materials = session.query(CourseMaterialView).filter_by(course_id=id).all()

    query = select(Course, is_favorite_sub,
                   is_subscribed_sub).where(Course.id == id)
    (course, is_favorite, is_subscribed) = session.exec(query).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    course = CourseRead.from_orm(course)
    course.is_favorite = is_favorite
    course.is_subscribed = is_subscribed
    course.total_subscriptions = course_total_subscriptions
    course.course_materials.sort(key=lambda x: x.order, reverse=False)

    for course_material in course.course_materials:
        # TODO: fix & improve this
        for viewed_course_material in viewed_course_materials:
            if viewed_course_material.material_id == course_material.id:
                course_material.viewed = True

    return course


@router.post("/", response_model=CourseRead)
def post_course(course: CourseCreate,
                user: UserDependency,
                session: Session = Depends(get_session)):
    session.add(new_course := Course.from_orm(course))
    new_course.teacher_id = user.id
    session.commit()
    session.refresh(new_course)
    return new_course


@router.post("/{id}/rate", response_model=CourseUserRate, status_code=200)
def upsert_course_rate(id: int,
                       user: UserDependency,
                       course_user_rate: CourseUserRate,
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
                                     rate=course_user_rate.rate,
                                     comment=course_user_rate.comment)
        response.status_code = 201
    # Else, update the existing one
    else:
        course_rate.rate = course_user_rate.rate
        course_rate.comment = course_user_rate.comment

    session.add(course_rate)
    session.commit()
    session.refresh(course_rate)
    return course_rate


@router.get("/{id}/rate", response_model=List[CourseUserRate], status_code=200)
def get_course_rates(id: int,
                     response: Response,
                     session: Session = Depends(get_session)):
    return session.query(CourseUserRate).filter(CourseUserRate.course_id == id).all()


@router.get("/{id}/rates", response_model=List[CourseUserRate], status_code=200)
def get_course_rates(id: int,
                     session: Session = Depends(get_session)):
    course_user_rates_statement = select(CourseUserRate).where(
        CourseUserRate.course_id == id)
    course_rates = session.exec(course_user_rates_statement).all()

    return course_rates


@router.post("/{id}/material", response_model=CourseReadWithMaterials, status_code=200)
def add_course_material(id: int,
                        material: CourseMaterialCreate,
                        session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    material = CourseMaterial.from_orm(material)
    material.course_id = id
    session.add(material)
    session.commit()
    session.refresh(course)

    return course


@router.post("/{id}/material/{material_id}/watched", response_model=CourseMaterialView, status_code=200)
def watch_course_material(id: int,
                          material_id: int,
                          session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    material = session.get(CourseMaterial, material_id)
    if not material:
        raise HTTPException(status_code=404, detail="Course material not found")

    course_material_view = CourseMaterialView(course_id=id, material_id=material_id, viewed=True)
    session.add(course_material_view)
    session.commit()

    return course_material_view


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


@router.get("/categories/", response_model=List[Category])
async def get_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories


@router.post("/{id}/subscribe", response_model=CourseUserFavorite)
def subscribe_course(id: int,
                     user: UserDependency,
                     session: Session = Depends(get_session)):
    existing_sub = session.query(CourseUserSubscription).filter_by(user_id=user.id,
                                                                   course_id=id).first()
    if not existing_sub:
        course_user_sub = CourseUserSubscription(
            user_id=user.id,
            course_id=id
        )
        session.add(course_user_sub)
        session.commit()
    return {"is_subscribed": True}


@router.get("/subscribed/", response_model=List[CourseRead])
def get_subscribed_courses(user: UserDependency, session: Session = Depends(get_session)):
    is_subscribed_sub = select(Course.user_subscriptions.any(
        User.id == user.id)).label("is_subscribed")
    query = select(Course, is_subscribed_sub).join(
        Course.user_subscriptions).where(User.id == user.id)
    courses = session.exec(query).scalars().all()

    return [CourseRead.from_orm(course) for course in courses]
