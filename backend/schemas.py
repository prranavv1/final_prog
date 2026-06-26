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
    report_finish_date: str | None = None
    quote_amount: float | None = 0
    remarks: str | None = None


# 🔹 JOB RESPONSE SCHEMA (OUTPUT TO FRONTEND)
from typing import Optional, List

class JobResponse(BaseModel):
    job_id: int
    job_no: int

    customer_id: int
    customer_name: str

    product_service: Optional[str] = None
    lead_engineer: Optional[str] = None

    # 🔥 Change these three
    supporting_engineers: list = []
    assets_carried: list = []
    planned_tests: list = []

    job_site: Optional[str] = None
    job_state: Optional[str] = None
    job_country: Optional[str] = None

    job_activity: Optional[str] = None
    job_start_date: Optional[date] = None
    report_finish_date: Optional[date] = None

    quote_amount: float | None = 0
    remarks: str | None = None

    class Config:
        from_attributes = True


    class Config:
        from_attributes = True
from datetime import date

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
    job_start_date: date | None = None
    job_end_date: date | None = None
    report_finish_date: date | None = None

    quote_amount: float | None = None
    remarks: str | None = None



class ExpenseCreate(BaseModel):
    job_no: int
    expense_type_id: int
    expense_payment_status_id: int
    expense_amount: float
    expense_date: date
    expense_submitted_by_engineer_id: int


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
