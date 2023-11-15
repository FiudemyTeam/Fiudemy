from typing import Optional

from sqlmodel import SQLModel


class CourseCertificate(SQLModel):
    course_id: Optional[int] = None
    course_name: Optional[str] = None
    issued_date: Optional[str] = None
