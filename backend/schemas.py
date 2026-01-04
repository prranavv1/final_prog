from pydantic import BaseModel
from datetime import date
from typing import List, Optional

# 🔹 AUTH SCHEMAS
class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


# 🔹 JOB CREATE SCHEMA (INPUT FROM FRONTEND)
class JobCreate(BaseModel):
    job_no: int

    # ✅ CHANGE HERE (ID → STRING NAME)
    customer: str

    product_service: str

    job_site: str
    job_state: str
    job_country: str

    lead_engineer: str
    supporting_engineers: List[str]
    assets_carried: List[str]
    planned_tests: List[str]

    transport_mode_id: int
    vehicle_detail_id: Optional[int] = None
    driver_accompanied_id: Optional[int] = None
    power_plant_type_id: Optional[int] = None

    job_activity: str
    job_work_status_id: int
    job_report_status_id: int
    job_start_date: date



# 🔹 JOB RESPONSE SCHEMA (OUTPUT TO FRONTEND)
class JobResponse(BaseModel):
    job_id: int
    job_no: int

    customer_id: int
    customer_name: str   # ✅ string name

    product_service: Optional[str] = None
    lead_engineer: Optional[str] = None

    supporting_engineers: List[str] = []
    assets_carried: List[str] = []
    planned_tests: List[str] = []

    job_site: Optional[str] = None
    job_state: Optional[str] = None
    job_country: Optional[str] = None

    job_activity: Optional[str] = None
    job_start_date: Optional[date] = None

    class Config:
        from_attributes = True
