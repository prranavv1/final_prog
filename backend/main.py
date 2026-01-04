from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import Customer
from database import Base, engine, get_db
from auth import router as auth_router
from job import Job
from schemas import JobCreate, JobResponse

# 🔹 CREATE APP
app = FastAPI()

# 🔹 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 CREATE TABLES
Base.metadata.create_all(bind=engine)

# 🔹 ROUTERS
app.include_router(auth_router)

# 🔹 ROOT
@app.get("/")
def root():
    return {"status": "Backend running"}


# 🔹 GET JOBS
@app.get("/jobs", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db)):

    results = (
        db.query(Job, Customer)
        .join(Customer, Job.customer_id == Customer.customer_id)
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

            "lead_engineer": job.lead_engineer,
            "supporting_engineers": job.supporting_engineers or [],
            "assets_carried": job.assets_carried or [],
            "planned_tests": job.planned_tests or [],

            "job_activity": job.job_activity,
            "job_start_date": job.job_start_date
        })

    return jobs


# 🔹 CREATE JOB
@app.post("/jobs")
@app.post("/jobs")
def create_job(job: JobCreate, db: Session = Depends(get_db)):

    existing_job = db.query(Job).filter(Job.job_no == job.job_no).first()
    if existing_job:
        raise HTTPException(
            status_code=400,
            detail="Job number already exists. Please use a different Job No."
        )

    customer = db.query(Customer).filter(
        Customer.customer_name == job.customer
    ).first()

    if not customer:
        raise HTTPException(
            status_code=400,
            detail="Invalid customer name"
        )

    new_job = Job(
        job_no=job.job_no,
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
        job_start_date=job.job_start_date
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {"message": "Job added successfully"}
# 🔹 UPDATE JOB
@app.put("/jobs/{job_no}")
def update_job(job_no: int, job: JobCreate, db: Session = Depends(get_db)):

    existing_job = db.query(Job).filter(Job.job_no == job_no).first()

    if not existing_job:
        raise HTTPException(status_code=404, detail="Job not found")

    customer = db.query(Customer).filter(
        Customer.customer_name == job.customer
    ).first()

    if not customer:
        raise HTTPException(status_code=400, detail="Invalid customer name")

    # 🔁 Update fields
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

    db.commit()

    return {"message": "Job updated successfully"}
