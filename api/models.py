from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
import datetime
from pydantic import validator, EmailStr


class CourseBase(SQLModel):
    name: str = Field(index=True)
    description: Optional[str] = None
    image: Optional[str] = None


class CourseUserRate(SQLModel, table=True):
    user_id: Optional[int] = Field(
        default=None, foreign_key="user.id", primary_key=True
    )
    course_id: Optional[int] = Field(
        default=None, foreign_key="course.id", primary_key=True
    )
    rate: int


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: int


class UserBase(SQLModel):
    username: str = Field(index=True)
    email: EmailStr
    about_me: Optional[str] = Field(max_length=300, default="")


class User(UserBase, table=True):
    id: Optional[int] = Field(primary_key=True)
    password: str = Field(max_length=256, min_length=6)
    created_at: datetime.datetime = datetime.datetime.now()
    course_rates: List["Course"] = Relationship(back_populates="user_rates", link_model=CourseUserRate)


class Course(CourseBase, table=True):
    # Id is Optional because it is auto generated
    id: Optional[int] = Field(default=None, primary_key=True)
    user_rates: List[User] = Relationship(back_populates="course_rates", link_model=CourseUserRate)


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
    username: str
    password: str


class UserUpdate(SQLModel):
    about_me: Optional[str] = Field(max_length=300, default="")
    email: EmailStr = None


class UserRead(UserBase):
    id: int
    created_at: datetime.datetime
