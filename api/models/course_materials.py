from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .courses import Course


class CourseMaterialBase(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    value: Optional[str] = None


class CourseMaterial(CourseMaterialBase, table=True):
    # Id is Optional because it is auto generated
    id: Optional[int] = Field(default=None, primary_key=True)
    course_id: Optional[int] = Field(
        default=None, foreign_key="course.id"
    )
    course: Optional["Course"] = Relationship(back_populates="course_materials")


class CourseMaterialCreate(CourseMaterialBase):
    pass