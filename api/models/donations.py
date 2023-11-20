from typing import Optional

from sqlmodel import Field, SQLModel

from models.users import User


class DonationBase(SQLModel):
    teacher_id: Optional[int] = Field(default=None, foreign_key="user.id")
    amount: Optional[int] = None
    message: Optional[str] = None


class Donation(DonationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    donor_id: Optional[int] = Field(default=None, foreign_key="user.id")


class DonationCreate(DonationBase):
    pass


class DonationRead(DonationBase):
    id: Optional[int] = None
    donor_id: Optional[int] = None
    donor_data: Optional[User] = None
