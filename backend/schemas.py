from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from typing import List

# 🔹 AUTH SCHEMAS
class UserCreate(BaseModel):
    username: str
    password: str
    role: str


class UserLogin(BaseModel):
    username: str
    password: str


# 🔹 JOB CREATE SCHEMA (INPUT FROM FRONTEND)
class JobCreate(BaseModel):
    customer: str

    product_service: str | None = None
    job_site: str | None = None
    job_state: str | None = None
    job_country: str | None = None

    transport_mode_id: int | None = None
    vehicle_detail_id: int | None = None
    driver_accompanied_id: int | None = None
    power_plant_type_id: int | None = None

    lead_engineer: str | None = None
    supporting_engineers: list = []
    assets_carried: list = []
    planned_tests: list = []

    job_activity: str | None = None
    job_work_status_id: int = 1
    job_report_status_id: int = 1
    job_start_date: str





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
class JobUpdate(BaseModel):
    customer: str | None = None
    product_service: str | None = None
    job_site: str | None = None
    job_state: str | None = None
    job_country: str | None = None

    transport_mode_id: int | None = None
    vehicle_detail_id: int | None = None
    driver_accompanied_id: int | None = None
    power_plant_type_id: int | None = None

    lead_engineer: str | None = None
    supporting_engineers: list | None = None
    assets_carried: list | None = None
    planned_tests: list | None = None

    job_work_status_id: int | None = None
    job_report_status_id: int | None = None

    report_prepared_by: str | None = None
    report_reviewed_by: str | None = None

    job_activity: str | None = None
    job_start_date: str | None = None
    job_end_date: str | None = None



class ExpenseCreate(BaseModel):
    job_no: int
    expense_type_id: int
    expense_payment_status_id: int
    expense_amount: float
    expense_date: date
    expense_submitted_by_engineer_id: int
class JobFinancialCreate(BaseModel):
    job_id: int
    invoice_number: str
    invoice_date: date | None = None
    invoice_net_amount: float | None = None
    invoice_gst_amount: float | None = None
    invoice_gross_amount: float | None = None
    payment_due_date: date | None = None
    payment_date: date | None = None
    invoice_payment_status: str | None = None

class JobFinancialCreate(BaseModel):
    job_no: int
    invoice_number: str
    invoice_date: str
    invoice_net_amount: float
    invoice_gst_amount: float
    invoice_gross_amount: float
    payment_due_date: str
    payment_date: str | None = None
    invoice_payment_status: str
