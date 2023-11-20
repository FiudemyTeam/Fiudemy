from typing import List, Optional

from dependencies import UserDependency, get_session
from fastapi import APIRouter, Depends, HTTPException
from models.donations import DonationCreate, Donation
from models.donations import DonationRead
from models.users import User
from sqlmodel import Session, select, and_

router = APIRouter(
    prefix="/donations",
    tags=["donations"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[DonationRead])
async def get_donations(
        teacher_id: Optional[int] = None,
        session: Session = Depends(get_session)
):
    query = select(Donation)
    filters = []

    if teacher_id:
        filters.append(Donation.teacher_id == teacher_id)
    query = query.where(and_(*filters))
    donation_results = session.exec(query)

    donations = []
    for donation in donation_results:
        donation = DonationRead.from_orm(donation)
        donations.append(donation)

        # FIXME: do this through the ORM
        statement = select(User).where(User.id == donation.donor_id)
        result = session.exec(statement)
        donation.donor_data = result.first()

    return donations


@router.get("/{id}", response_model=DonationRead)
async def get_donation(id: int,
                       session: Session = Depends(get_session)):
    query = select(Donation).where(Donation.id == id)
    donation = session.exec(query).one_or_none()

    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")

    return donation


@router.post("/", response_model=DonationRead)
def create_donation(donation: DonationCreate,
                    user: UserDependency,
                    session: Session = Depends(get_session)):
    session.add(new_donation := Donation.from_orm(donation))
    new_donation.donor_id = user.id
    session.commit()
    session.refresh(new_donation)

    return new_donation
