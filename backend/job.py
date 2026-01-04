from sqlalchemy import Column, Integer, String, Date, JSON
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    job_id = Column(Integer, primary_key=True)
    job_no = Column(Integer)
    customer_id = Column(Integer)

    product_service = Column(String(100))

    job_site = Column(String(100))
    job_state = Column(String(100))
    job_country = Column(String(100))

    lead_engineer = Column(String(100))
    supporting_engineers = Column(JSON)
    assets_carried = Column(JSON)
    planned_tests = Column(JSON)

    transport_mode_id = Column(Integer)
    vehicle_detail_id = Column(Integer)
    driver_accompanied_id = Column(Integer)
    power_plant_type_id = Column(Integer)

    job_activity = Column(String(500))
    job_work_status_id = Column(Integer)
    job_report_status_id = Column(Integer)

    job_start_date = Column(Date)
