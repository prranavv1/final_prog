from sqlalchemy import Column, BigInteger, String, Date, Float, ForeignKey
from database import Base

class JobFinancial(Base):
    __tablename__ = "job_financials"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    job_id = Column(BigInteger, ForeignKey("jobs.job_id"), nullable=False, unique=True)


    invoice_number = Column(String(50))
    invoice_date = Column(Date)

    invoice_net_amount = Column(Float)
    invoice_gst_amount = Column(Float)
    invoice_gross_amount = Column(Float)

    payment_due_date = Column(Date)
    payment_date = Column(Date)

    invoice_payment_status = Column(String(20))
    remarks = Column(String, nullable=True)