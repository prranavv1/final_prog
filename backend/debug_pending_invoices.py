from database import SessionLocal
from job import Job
from models import Customer
from job_financials import JobFinancial

db = SessionLocal()
try:
    print("Attempting to query pending invoices...")
    results = (
        db.query(Job, Customer)
        .join(Customer, Job.customer_id == Customer.customer_id)
        .outerjoin(JobFinancial, Job.job_id == JobFinancial.job_id)
        .filter(Job.job_work_status_id == 3)
        .filter(JobFinancial.id == None)
        .all()
    )
    print(f"Found {len(results)} jobs")
    for job, cust in results:
        print(f"Job: {job.job_no}, Report Finish: {job.report_finish_date}")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
