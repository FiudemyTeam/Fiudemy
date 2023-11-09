from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from .course_rates import CourseUserRate
from .course_favorites import CourseUserFavorite

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
    category_id: Optional[int] = Field(default=None)


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int
    is_favorite: Optional[bool]

# Course Category

class Category(SQLModel, table=True):
    id: str = Field(default=None, index=True, primary_key=True)
    name: str
