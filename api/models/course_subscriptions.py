from typing import Optional
from sqlmodel import Field, SQLModel


class CourseUserSubscription(SQLModel, table=True):
    user_id: Optional[int] = Field(
        default=None, foreign_key="user.id", primary_key=True
    )
    course_id: Optional[int] = Field(
        default=None, foreign_key="course.id", primary_key=True
    )


class CourseTotalSubscriptions(SQLModel):
    total_subscriptions: int
