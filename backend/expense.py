from sqlalchemy import Column, Integer, BigInteger, ForeignKey, Date, DECIMAL, String
from database import Base

class JobExpense(Base):
    __tablename__ = "job_expenses"

    expense_id = Column(BigInteger, primary_key=True, index=True)
    job_no = Column(Integer, ForeignKey("jobs.job_no"))

    expense_type_id = Column(Integer)
    expense_payment_status_id = Column(Integer)

    expense_amount = Column(DECIMAL(10,2))
    expense_date = Column(Date)

    expense_submitted_by_engineer_id = Column(BigInteger)
    expense_docs = Column(String(255))
