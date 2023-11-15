from typing import Optional

from sqlmodel import SQLModel, Field


class CourseMaterialView(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    material_id: int = Field(
        default=None, foreign_key="coursematerial.id"
    )
    user_id: int = Field(
        default=None, foreign_key="user.id"
    )
