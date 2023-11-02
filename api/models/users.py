from typing import Optional, List, TYPE_CHECKING
from sqlmodel import Field, SQLModel, Relationship
import datetime
from pydantic import validator, EmailStr

from .course_rates import CourseUserRate

if TYPE_CHECKING:
    from .courses import Course


class UserBase(SQLModel):
    username: str = Field(index=True)
    email: EmailStr
    about_me: Optional[str] = Field(max_length=300, default="")


class User(UserBase, table=True):
    id: Optional[int] = Field(primary_key=True)
    password: str = Field(max_length=256, min_length=6)
    created_at: datetime.datetime = datetime.datetime.now()
    course_rates: List["Course"] = Relationship(back_populates="user_rates", link_model=CourseUserRate)


class UserInput(SQLModel):
    username: str
    password: str = Field(max_length=256, min_length=6)
    password2: str
    email: EmailStr

    @validator('password2')
    def password_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords don\'t match')
        return v


class UserLogin(SQLModel):
    username: str = "default_username"
    password: str = "default_password"


class UserUpdate(SQLModel):
    about_me: Optional[str] = Field(max_length=300, default="")
    email: EmailStr = None


class UserRead(UserBase):
    id: int
    created_at: datetime.datetime
