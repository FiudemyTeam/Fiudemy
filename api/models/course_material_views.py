from typing import Optional

from sqlmodel import SQLModel, Field


class CourseMaterialView(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    course_id: Optional[int] = Field(
        default=None, foreign_key="course.id", primary_key=False
    )
    material_id: Optional[int] = Field(
        default=None, foreign_key="coursematerial.id", primary_key=False
    )
    viewed: Optional[bool] = Field(default=False)
