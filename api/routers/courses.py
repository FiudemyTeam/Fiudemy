from datetime import datetime
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
from sqlalchemy import func

from models.course_certificate import CourseCertificate

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
    is_subscribed_sub = select(Course.user_subscriptions.any(
        User.id == user.id)).label("is_subscribed")
    avg_rate_sub = select([func.coalesce(func.round(func.avg(CourseUserRate.rate)), 0)]).where(CourseUserRate.course_id == Course.id).label("total_rate")
    query = select(Course, is_favorite_sub, is_subscribed_sub, avg_rate_sub)
    filters = []

    if category:
        filters.append(Course.category_id == category)

    if searchString:
        filters.append(Course.name.like(f"%{searchString}%"))

    if rate is not None:
        filters.append(avg_rate_sub == rate)

    if favorite:
        filters.append(Course.user_favorites.any(User.id == user.id))

    query = query.where(and_(*filters))
    results = session.exec(query)

    courses = []
    for course, is_favorite, is_subscribed, total_rate in results:
        course = CourseRead.from_orm(course)
        course.is_favorite = is_favorite
        course.is_subscribed = is_subscribed
        course.total_subscriptions = session.exec(
            select([func.count(CourseUserSubscription.user_id)])
            .where(CourseUserSubscription.course_id == course.id)
        ).one()
        course.total_rate = total_rate
        courses.append(course)

    return courses


@router.get("/{id}", response_model=CourseReadWithMaterials)
async def get_course(id: int,
                     user: UserDependency,
                     session: Session = Depends(get_session)):
    is_favorite_sub = select(Course.user_favorites.any(
        User.id == user.id)).label("is_favorite")
    is_subscribed_sub = select(Course.user_subscriptions.any(
        User.id == user.id)).label("is_subscribed")
    course_total_subscriptions = session.exec(
        select([func.count(CourseUserSubscription.user_id)])
        .where(CourseUserSubscription.course_id == id)
    ).one()

    query = select(Course,
                   is_favorite_sub,
                   is_subscribed_sub
                   ).where(Course.id == id)
    (course, is_favorite, is_subscribed) = session.exec(query).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    course = CourseReadWithMaterials.from_orm(course)
    course.is_favorite = is_favorite
    course.is_subscribed = is_subscribed
    course.total_subscriptions = course_total_subscriptions
    course.course_materials.sort(key=lambda x: x.order, reverse=False)

    viewed_material_ids = session.exec(
        select(CourseMaterialView.material_id)
        .where(CourseMaterialView.material_id.in_(
            [material.id for material in course.course_materials]
        ))
    ).all()
    for course_material in course.course_materials:
        if course_material.id in viewed_material_ids:
            course_material.viewed = True
        else:
            course_material.viewed = False

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


@router.delete("/{id}", response_model=CourseRead)
def delete_course(id: int, session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404,
                            detail="Course not found")

    session.delete(course)
    session.commit()
    return Response(status_code=200)


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
def get_course_rate(id: int,
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


@router.post("/{id}/material/{material_id}/view", response_model=CourseMaterialView, status_code=201)
def watch_course_material(id: int,
                          material_id: int,
                          user: UserDependency,
                          session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404,
                            detail="Course not found")

    material = session.get(CourseMaterial, material_id)
    if not material:
        raise HTTPException(status_code=404,
                            detail="Course material not found")

    course_material_view = CourseMaterialView(material_id=material_id,
                                              user_id=user.id)
    session.add(course_material_view)
    session.commit()

    return course_material_view


@router.delete("/{id}/material/{material_id}/view", status_code=200)
def unwatch_course_material(id: int,
                            material_id: int,
                            user: UserDependency,
                            session: Session = Depends(get_session)):
    course = session.get(Course, id)
    if not course:
        raise HTTPException(status_code=404,
                            detail="Course not found")

    material = session.get(CourseMaterial, material_id)
    if not material:
        raise HTTPException(status_code=404,
                            detail="Course material not found")

    course_material_view = session.query(CourseMaterialView).filter_by(material_id=material_id,
                                                                       user_id=user.id).first()
    if course_material_view:
        session.delete(course_material_view)
        session.commit()
    return Response(status_code=200)


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

@router.delete("/{id}/unsubscribe", response_model=CourseUserFavorite)
def unsubscribe_course(id: int,
                       user: UserDependency,
                       session: Session = Depends(get_session)):
    existing_sub = session.query(CourseUserSubscription).filter_by(user_id=user.id, course_id=id).first()
    if existing_sub:
        session.delete(existing_sub)
        session.commit()
    else:
        raise HTTPException(status_code=404, detail="Not subscribed to this course")
    
    return {"is_subscribed": False}

@router.get("/subscribed/", response_model=List[CourseRead])
def get_subscribed_courses(user: UserDependency, session: Session = Depends(get_session)):
    is_subscribed_sub = select(Course.user_subscriptions.any(
        User.id == user.id)).label("is_subscribed")
    query = select(Course, is_subscribed_sub).join(
        Course.user_subscriptions).where(User.id == user.id)
    courses = session.exec(query).scalars().all()

    return [CourseRead.from_orm(course) for course in courses]


@router.get("/{id}/certificate", response_model=CourseCertificate)
async def get_course_certificate(id: int,
                                 session: Session = Depends(get_session)):
    query = select(Course).where(Course.id == id)
    course = session.exec(query).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    viewed_material_ids = session.exec(
        select(CourseMaterialView.material_id)
        .where(CourseMaterialView.material_id.in_(
            [material.id for material in course.course_materials]
        ))
    ).all()

    if len(viewed_material_ids) != len(course.course_materials):
        raise HTTPException(status_code=400, detail="Course not completed")

    course_certificate = CourseCertificate(course_id=course.id, course_name=course.name,
                                           issued_date=str(datetime.now()))

    qrcode = segno.make_qr(str(course_certificate))
    tmp_certificate_file = "certificate_qrcode.png"
    qrcode.save(tmp_certificate_file, scale=200)
    data = open(tmp_certificate_file, "rb").read()

    return Response(content=data, media_type="image/png")
