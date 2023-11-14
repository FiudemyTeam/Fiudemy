from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from .course_rates import CourseUserRate
from .course_favorites import CourseUserFavorite
from .course_materials import CourseMaterial
from .course_subscriptions import CourseUserSubscription

from .users import User

# Course


class CourseBase(SQLModel):
    name: str = Field(index=True)
    description: Optional[str] = None
    image: Optional[str] = None


class Course(CourseBase, table=True):
    # Id is Optional because it is auto generated
    id: Optional[int] = Field(default=None, primary_key=True)
    user_rates: List["User"] = Relationship(back_populates="course_rates",
                                            link_model=CourseUserRate)
    user_favorites: List["User"] = Relationship(back_populates="course_favorites",
                                                link_model=CourseUserFavorite)
    course_materials: List["CourseMaterial"] = Relationship(back_populates="course")
    user_subscriptions: List["User"] = Relationship(back_populates="course_subscriptions",
                                                    link_model=CourseUserSubscription)
    category_id: Optional[int] = Field(default=None)
    teacher_id: Optional[int] = Field(default=None, foreign_key="user.id")


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int
    is_favorite: Optional[bool]
    teacher_id: Optional[int]
    is_subscribed: Optional[bool]
    total_subscriptions: Optional[int]
    course_materials: List["CourseMaterial"]


class CourseReadWithMaterials(CourseRead):
    course_materials: List[CourseMaterial] = []


# Course Category
class Category(SQLModel, table=True):
    id: str = Field(default=None, index=True, primary_key=True)
    name: str
