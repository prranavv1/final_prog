from sqlalchemy import Column, Integer, String, Date, JSON, BigInteger, Float
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(BigInteger, primary_key=True, autoincrement=True)
    job_no = Column(Integer, unique=True)

    customer_id = Column(BigInteger)

    product_service = Column(String(100))

    job_site = Column(String(100))
    job_state = Column(String(100))
    job_country = Column(String(100))

    transport_mode_id = Column(Integer)
    vehicle_detail_id = Column(Integer)
    driver_accompanied_id = Column(Integer)
    power_plant_type_id = Column(Integer)

    lead_engineer = Column(String(100))
    supporting_engineers = Column(JSON)
    assets_carried = Column(JSON)
    planned_tests = Column(JSON)

    quote_amount = Column(Float, default=0)
    remarks = Column(String(500))

    job_activity = Column(String(500))

    job_work_status_id = Column(Integer)
    job_report_status_id = Column(Integer)

    report_prepared_by = Column(String(100))
    report_reviewed_by = Column(String(100))

    job_start_date = Column(Date)
    job_end_date = Column(Date)
    report_finish_date = Column(Date)
