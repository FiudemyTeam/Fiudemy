from typing import Optional

from sqlmodel import Field, SQLModel


class CourseBase(SQLModel):
    name: str = Field(index=True)
    description: Optional[str] = None


class Course(CourseBase, table=True):
    # Id is Optional because it is auto generated
    id: Optional[int] = Field(default=None, primary_key=True)


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int
