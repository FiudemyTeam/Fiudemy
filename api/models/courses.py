from typing import Optional, List, TYPE_CHECKING
from sqlmodel import Field, SQLModel, Relationship

from .course_rates import CourseUserRate
from .course_favorites import CourseUserFavorite
from .course_materials import CourseMaterial

if TYPE_CHECKING:
    from .users import User


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
    category_id: Optional[int] = Field(default=None)


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int


class CourseReadWithMaterials(CourseRead):
    course_materials: List[CourseMaterial] = []
