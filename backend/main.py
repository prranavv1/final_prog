from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import Customer
from database import Base, engine, get_db
from auth import router as auth_router
from job import Job
from schemas import JobCreate, JobResponse
from schemas import JobUpdate
from expense import JobExpense
from schemas import ExpenseCreate
from schemas import JobFinancialCreate
from job_financials import JobFinancial
from datetime import date
from fastapi import UploadFile, File
import os
from fastapi import FastAPI, UploadFile, File
from cloudinary_config import cloudinary
import cloudinary.uploader

# 🔹 CREATE APP
app = FastAPI()

# 🔹 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔹 CREATE TABLES
Base.metadata.create_all(bind=engine)

# 🔹 ROUTERS
app.include_router(auth_router)
JOB_STATUS_MAP = {
    1: "Not Started",
    2: "Ongoing",
    3: "Completed"
}

REPORT_STATUS_MAP = {
    1: "Not Started",
    2: "Ongoing",
    3: "Completed"
}
from sqlalchemy import text

@app.get("/job-summary")
def get_job_summary(year: int, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
          MONTH(job_start_date) as month,
          COUNT(*) as started,
          SUM(CASE WHEN job_work_status_id = 3 THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN job_work_status_id != 3 THEN 1 ELSE 0 END) as progress
        FROM jobs
        WHERE YEAR(job_start_date) = :year
        GROUP BY MONTH(job_start_date)
        ORDER BY MONTH(job_start_date)
    """), {"year": year}).fetchall()

    months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    data = []

    total_jobs = 0
    completed_jobs = 0

    for r in result:
        data.append({
            "month": months[r[0]-1],
            "started": r[1],
            "completed": r[2],
            "progress": r[3]
        })
        total_jobs += r[1]
        completed_jobs += r[2]

    return {
        "total_jobs": total_jobs,
        "completed_jobs": completed_jobs,
        "monthly": data
    }
@app.get("/payment-summary")
def get_payment_summary(year: int, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
          MONTH(invoice_date) as month,
          SUM(CASE WHEN invoice_payment_status = 'Paid' THEN invoice_gross_amount ELSE 0 END) as received,
          SUM(CASE WHEN invoice_payment_status = 'Partially Paid' THEN invoice_gross_amount ELSE 0 END) as progress,
          SUM(CASE WHEN invoice_payment_status = 'Not Paid' THEN invoice_gross_amount ELSE 0 END) as pending
        FROM job_financials
        WHERE YEAR(invoice_date) = :year
        GROUP BY MONTH(invoice_date)
        ORDER BY MONTH(invoice_date)
    """), {"year": year}).fetchall()

    months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    # Initialize all months with 0
    monthly_data = {m: {"received": 0, "progress": 0, "pending": 0} for m in months}

    total_received = 0
    total_progress = 0
    total_pending = 0

    for r in result:
        month_name = months[r[0]-1]
        monthly_data[month_name]["received"] = r[1] or 0
        monthly_data[month_name]["progress"] = r[2] or 0
        monthly_data[month_name]["pending"] = r[3] or 0
        
        total_received += r[1] or 0
        total_progress += r[2] or 0
        total_pending += r[3] or 0

    # Convert back to list
    monthly = [{"month": m, **data} for m, data in monthly_data.items()]

    return {
        "monthly": monthly,
        "received": total_received,
        "progress": total_progress,
        "pending": total_pending,
        "revenue": total_received + total_progress + total_pending
    }


# 🔹 UPDATE EXPENSE
@app.put("/job-expenses/{expense_id}")
def update_expense(expense_id: int, expense: ExpenseCreate, db: Session = Depends(get_db)):
    existing = db.query(JobExpense).filter(JobExpense.expense_id == expense_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Expense not found")

    existing.expense_type_id = expense.expense_type_id
    existing.expense_payment_status_id = expense.expense_payment_status_id
    existing.expense_amount = expense.expense_amount
    existing.expense_date = expense.expense_date
    existing.expense_submitted_by_engineer_id = expense.expense_submitted_by_engineer_id

    db.commit()
    return {"message": "Expense updated successfully"}


# 🔹 DELETE EXPENSE
@app.delete("/job-expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(JobExpense).filter(JobExpense.expense_id == expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}
@app.get("/job-details")
def get_job_details(db: Session = Depends(get_db)):
    results = (
        db.query(JobFinancial, Job, Customer)
        .join(Job, JobFinancial.job_id == Job.job_id)
        .outerjoin(Customer, Job.customer_id == Customer.customer_id)
        .all()
    )

    data = []
    for fin, job, customer in results:
        data.append({
            "job_no": job.job_no,
            "invoice_no": fin.invoice_number,
            "client": customer.customer_name,
            "site": job.job_site,
            "job_finish_date": job.job_end_date,
            "invoice_date": fin.invoice_date,
            "amount": fin.invoice_gross_amount,
            "due_date": fin.payment_due_date,
            "payment_date": fin.payment_date,
            "status": fin.invoice_payment_status
        })

    return data


# 🔹 UPLOAD DOCUMENT FOR EXPENSE
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/job-expenses/{expense_id}/upload")
def upload_expense_document(
    expense_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    expense = db.query(JobExpense).filter(JobExpense.expense_id == expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    file_path = os.path.join(UPLOAD_DIR, f"{expense_id}_{file.filename}")

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    expense.expense_docs = file_path
    db.commit()

    return {
        "message": "Document uploaded successfully",
        "file_path": file_path
    }


# 🔹 ROOT
@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/api/customers")
def get_customers_api(db: Session = Depends(get_db)):
    customers = db.query(Customer).all()
    return [
        {"customer_name": c.customer_name}
        for c in customers
    ]


# 🔹 GET CUSTOMERS (FOR SEARCH DROPDOWN)
@app.get("/customers")
def get_customers_dropdown(db: Session = Depends(get_db)):
    customers = db.query(Customer).order_by(Customer.customer_name).all()
    return [
        {"customer_name": c.customer_name}
        for c in customers
    ]


def root():
    return {"status": "Backend running"}
@app.put("/accounts-receivable/{financial_id}/remarks")
def update_remarks(financial_id: int, remarks: str, db: Session = Depends(get_db)):
    fin = db.query(JobFinancial).filter(JobFinancial.id == financial_id).first()
    if not fin:
        raise HTTPException(status_code=404, detail="Record not found")

    fin.remarks = remarks
    db.commit()
    return {"message": "Remarks updated"}



# 🔹 GET JOBS
@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):

    results = (
    db.query(Job, Customer)
    .outerjoin(Customer, Job.customer_id == Customer.customer_id)
    .all()
)


    jobs = []

    for job, customer in results:
        jobs.append({
            "job_id": job.job_id,
            "job_no": job.job_no,
            "customer_id": job.customer_id,
            "customer_name": customer.customer_name,

            "product_service": job.product_service,
            "job_site": job.job_site,
            "job_state": job.job_state,
            "job_country": job.job_country,

            "transport_mode_id": job.transport_mode_id,
            "vehicle_detail_id": job.vehicle_detail_id,
            "driver_accompanied_id": job.driver_accompanied_id,
            "power_plant_type_id": job.power_plant_type_id,

            "lead_engineer": job.lead_engineer,
            "supporting_engineers": job.supporting_engineers or [],
            "assets_carried": job.assets_carried or [],
            "planned_tests": job.planned_tests or [],

            "job_work_status": JOB_STATUS_MAP.get(job.job_work_status_id, ""),
            "job_report_status": REPORT_STATUS_MAP.get(job.job_report_status_id, ""),


            "job_activity": job.job_activity,
            "job_start_date": job.job_start_date
        })

    return jobs



@app.get("/jobs/{job_no}")
def get_job_by_job_no(job_no: int, db: Session = Depends(get_db)):

    job = (
        db.query(Job, Customer)
        .join(Customer, Job.customer_id == Customer.customer_id)
        .filter(Job.job_no == job_no)
        .first()
    )

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job, customer = job

    return {
    "job_id": job.job_id,
    "job_no": job.job_no,
    "customer_name": customer.customer_name,

    "product_service": job.product_service,
    "job_site": job.job_site,
    "job_state": job.job_state,
    "job_country": job.job_country,

    # 🔥 ADD THESE TWO LINES
    "job_work_status": JOB_STATUS_MAP.get(job.job_work_status_id, ""),
    "job_report_status": REPORT_STATUS_MAP.get(job.job_report_status_id, ""),

    "transport_mode_id": job.transport_mode_id,
    "vehicle_detail_id": job.vehicle_detail_id,
    "driver_accompanied_id": job.driver_accompanied_id,
    "power_plant_type_id": job.power_plant_type_id,

    "lead_engineer": job.lead_engineer,
    "supporting_engineers": job.supporting_engineers or [],
    "assets_carried": job.assets_carried or [],
    "planned_tests": job.planned_tests or [],

    "job_activity": job.job_activity,
    "job_start_date": job.job_start_date,
    "job_end_date": job.job_end_date,
    "report_finish_date": job.report_finish_date
}


# 🔹 CREATE JOB
@app.post("/jobs")
def create_job(job: JobCreate, db: Session = Depends(get_db)):

    # 🔹 Step 1: Get current year
    current_year = date.today().year

    # 🔹 Step 2: Find last job number of this year
    last_job = (
        db.query(Job)
        .filter(Job.job_no.like(f"{current_year}%"))
        .order_by(Job.job_no.desc())
        .first()
    )

    # 🔹 Step 3: Generate next sequence
    if last_job:
        last_seq = int(str(last_job.job_no)[4:])   # remove year part
        new_seq = last_seq + 1
    else:
        new_seq = 1

    # 🔹 Step 4: Create new job number (3 digit format)
    new_job_no = int(f"{current_year}{new_seq:03d}")
    # Example: 2026001, 2026002 ...

    # 🔹 Step 5: Continue your existing logic
    customer = db.query(Customer).filter(
        Customer.customer_name == job.customer
    ).first()

    if not customer:
        raise HTTPException(status_code=400, detail="Invalid customer name")

    new_job = Job(
        job_no=new_job_no,   # 🔥 Auto generated
        customer_id=customer.customer_id,
        product_service=job.product_service,

        job_site=job.job_site,
        job_state=job.job_state,
        job_country=job.job_country,

        transport_mode_id=job.transport_mode_id,
        vehicle_detail_id=job.vehicle_detail_id,
        driver_accompanied_id=job.driver_accompanied_id,
        power_plant_type_id=job.power_plant_type_id,

        lead_engineer=job.lead_engineer,
        supporting_engineers=job.supporting_engineers,
        assets_carried=job.assets_carried,
        planned_tests=job.planned_tests,

        job_activity=job.job_activity,
        job_work_status_id=job.job_work_status_id,
        job_report_status_id=job.job_report_status_id,
        job_start_date=job.job_start_date,
        report_finish_date=job.report_finish_date,
        quote_amount=job.quote_amount,
        remarks=job.remarks
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job added successfully",
        "job_no": new_job_no   # 🔥 return auto number to frontend
    }

# 🔹 UPDATE JOB
@app.put("/jobs/{job_no}")
def update_job(job_no: int, job: JobUpdate, db: Session = Depends(get_db)):

    existing_job = db.query(Job).filter(Job.job_no == job_no).first()

    if not existing_job:
        raise HTTPException(status_code=404, detail="Job not found")

    if job.customer:
        customer = db.query(Customer).filter(
        Customer.customer_name == job.customer
    ).first()
    if not customer:
        raise HTTPException(status_code=400, detail="Invalid customer name")
    existing_job.customer_id = customer.customer_id


    existing_job.customer_id = customer.customer_id

    existing_job.product_service = job.product_service

    existing_job.job_site = job.job_site
    existing_job.job_state = job.job_state
    existing_job.job_country = job.job_country

    existing_job.transport_mode_id = job.transport_mode_id
    existing_job.vehicle_detail_id = job.vehicle_detail_id
    existing_job.driver_accompanied_id = job.driver_accompanied_id
    existing_job.power_plant_type_id = job.power_plant_type_id

    existing_job.lead_engineer = job.lead_engineer
    existing_job.supporting_engineers = job.supporting_engineers
    existing_job.assets_carried = job.assets_carried
    existing_job.planned_tests = job.planned_tests

    existing_job.job_activity = job.job_activity
    existing_job.job_work_status_id = job.job_work_status_id
    existing_job.job_report_status_id = job.job_report_status_id
    existing_job.job_start_date = job.job_start_date
    existing_job.job_end_date = job.job_end_date
    existing_job.report_finish_date = job.report_finish_date
    existing_job.quote_amount = job.quote_amount
    existing_job.remarks = job.remarks

    db.commit()

    return {"message": "Job updated successfully"}
@app.post("/job-expenses")
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = JobExpense(
        job_no=expense.job_no,
        expense_type_id=expense.expense_type_id,
        expense_payment_status_id=expense.expense_payment_status_id,
        expense_amount=expense.expense_amount,
        expense_date=expense.expense_date,
        expense_submitted_by_engineer_id=expense.expense_submitted_by_engineer_id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {"message": "Expense added successfully"}
@app.post("/job-financials")
def save_job_financials(data: JobFinancialCreate, db: Session = Depends(get_db)):

    job = db.query(Job).filter(Job.job_no == data.job_no).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = db.query(JobFinancial).filter(JobFinancial.job_id == job.job_id).first()
    
    # Sanitize dates
    pay_date = data.payment_date if data.payment_date else None
    inv_date = data.invoice_date if data.invoice_date else None
    due_date = data.payment_due_date if data.payment_due_date else None

    if existing:
        # Update existing
        existing.invoice_number = data.invoice_number
        existing.invoice_date = inv_date
        existing.invoice_net_amount = data.invoice_net_amount
        existing.invoice_gst_amount = data.invoice_gst_amount
        existing.invoice_gross_amount = data.invoice_gross_amount
        existing.payment_due_date = due_date
        existing.payment_date = pay_date
        existing.invoice_payment_status = data.invoice_payment_status
        
        db.commit()
        db.refresh(existing)
        return existing

    new_fin = JobFinancial(
        job_id=job.job_id,
        invoice_number=data.invoice_number,
        invoice_date=inv_date,
        invoice_net_amount=data.invoice_net_amount,
        invoice_gst_amount=data.invoice_gst_amount,
        invoice_gross_amount=data.invoice_gross_amount,
        payment_due_date=due_date,
        payment_date=pay_date,
        invoice_payment_status=data.invoice_payment_status,
    )

    db.add(new_fin)
    db.commit()
    db.refresh(new_fin)
    return new_fin
@app.get("/job-financials/{job_no}")
def get_job_financials(job_no: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.job_no == job_no).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    fin = db.query(JobFinancial).filter(JobFinancial.job_id == job.job_id).first()
    if not fin:
        return None

    return {
        "invoice_number": fin.invoice_number,
        "invoice_date": fin.invoice_date,
        "invoice_net_amount": fin.invoice_net_amount,
        "invoice_gst_amount": fin.invoice_gst_amount,
        "invoice_gross_amount": fin.invoice_gross_amount,
        "payment_due_date": fin.payment_due_date,
        "payment_date": fin.payment_date,
        "invoice_payment_status": fin.invoice_payment_status
    }


    return fin

@app.get("/job-expenses/{job_no}")
def get_expenses(job_no: int, db: Session = Depends(get_db)):
    expenses = db.query(JobExpense).filter(JobExpense.job_no == job_no).all()

    return [
    {
        "expense_id": e.expense_id,   # 🔥 VERY IMPORTANT
        "expense_type_id": e.expense_type_id,
        "expense_payment_status_id": e.expense_payment_status_id,
        "expense_amount": e.expense_amount,
        "expense_date": e.expense_date,
        "expense_submitted_by_engineer_id": e.expense_submitted_by_engineer_id,
        "expense_docs": e.expense_docs
    }
    for e in expenses
]
@app.get("/accounts-receivable")
def get_accounts_receivable(db: Session = Depends(get_db)):
    results = (
    db.query(JobFinancial, Job, Customer)
    .join(Job, JobFinancial.job_id == Job.job_id)
    .join(Customer, Job.customer_id == Customer.customer_id)
    .filter(
        JobFinancial.invoice_number != None,           # Invoice must exist
        JobFinancial.invoice_payment_status != "Paid"  # Payment not completed
    )
    .all()
)


    data = []
    total_amount = 0

    for fin, job, customer in results:
        total_amount += fin.invoice_gross_amount or 0

        data.append({
    "id": fin.id,
    "job_no": job.job_no,
    "invoice_no": fin.invoice_number,
    "client": customer.customer_name,
    "invoice_amount": fin.invoice_gross_amount,
    "site": job.job_site,
    "job_finish_date": job.job_end_date,
    "invoice_date": fin.invoice_date,
    "due_date": fin.payment_due_date,
    "invoice_age": (date.today() - fin.invoice_date).days if fin.invoice_date else 0,
    "remarks": fin.remarks or ""
})


    return {
        "total_amount": total_amount,
        "rows": data
    }
@app.get("/pending-invoices")
def get_pending_invoices(db: Session = Depends(get_db)):
    # Query for invoices with "Not Paid" or "Partially Paid" status
    results = (
        db.query(JobFinancial, Job, Customer)
        .join(Job, JobFinancial.job_id == Job.job_id)
        .join(Customer, Job.customer_id == Customer.customer_id)
        .filter(
            JobFinancial.invoice_payment_status.in_(["Not Paid", "Partially Paid"])
        )
        .all()
    )

    data = []
    total_pending_amount = 0

    for fin, job, customer in results:
        # Calculate pending amount based on payment status
        pending_amount = fin.invoice_gross_amount or 0
        if fin.invoice_payment_status == "Partially Paid":
            # For partially paid, show full amount (could be enhanced to show actual pending)
            pending_amount = fin.invoice_gross_amount or 0
        
        total_pending_amount += pending_amount

        # Calculate days since job finish or invoice date
        days_pending = 0
        if job.job_end_date:
            days_pending = (date.today() - job.job_end_date).days
        elif fin.invoice_date:
            days_pending = (date.today() - fin.invoice_date).days

        data.append({
            "id": fin.id,
            "job_no": job.job_no,
            "client": customer.customer_name,
            "site": job.job_site or "-",
            "quote_amount": job.quote_amount or 0,
            "job_finish_date": job.job_end_date,
            "report_finish_status": REPORT_STATUS_MAP.get(job.job_report_status_id, "Not Started"),
            "pending_amount": pending_amount,
            "invoicing_pending": days_pending,
            "remarks": fin.remarks or job.remarks or ""
        })

    return {
        "total_amount": total_pending_amount,
        "rows": data
    }

@app.put("/pending-invoices/{financial_id}/remarks")
def update_pending_invoice_remarks(financial_id: int, remarks: str, db: Session = Depends(get_db)):
    financial = db.query(JobFinancial).filter(JobFinancial.id == financial_id).first()
    if not financial:
        raise HTTPException(status_code=404, detail="Financial record not found")
    
    financial.remarks = remarks
    db.commit()
    return {"message": "Remarks updated successfully"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    result = cloudinary.uploader.upload(file.file)
    return {
        "url": result["secure_url"],
        "public_id": result["public_id"]
    }
