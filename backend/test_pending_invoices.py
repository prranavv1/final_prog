#!/usr/bin/env python3

"""
Test script to create sample data for pending invoices functionality.
This script creates test jobs and financial records to demonstrate the pending invoices feature.
"""

from sqlalchemy.orm import Session
from database import get_db, engine
from models import Customer
from job import Job
from job_financials import JobFinancial
from datetime import date, timedelta
import sys

def create_test_data():
    """Create sample data for testing pending invoices functionality"""
    
    # Get database session
    db = Session(bind=engine)
    
    try:
        # Create test customer if not exists
        customer = db.query(Customer).filter(Customer.customer_name == "Test Customer Ltd").first()
        if not customer:
            customer = Customer(customer_name="Test Customer Ltd")
            db.add(customer)
            db.commit()
            db.refresh(customer)
            print(f"✓ Created test customer: {customer.customer_name}")
        
        # Create test jobs
        test_jobs = [
            {
                "job_no": 2026901,
                "customer_id": customer.customer_id,
                "product_service": "Testing Services",
                "job_site": "Mumbai Site",
                "job_state": "Maharashtra",
                "job_country": "India",
                "job_work_status_id": 3,  # Completed
                "job_report_status_id": 3,  # Report Complete
                "quote_amount": 150000,
                "job_start_date": date.today() - timedelta(days=30),
                "job_end_date": date.today() - timedelta(days=10),
                "report_finish_date": date.today() - timedelta(days=5)
            },
            {
                "job_no": 2026902,
                "customer_id": customer.customer_id,
                "product_service": "Inspection Services",
                "job_site": "Delhi Site",
                "job_state": "Delhi",
                "job_country": "India",
                "job_work_status_id": 3,  # Completed
                "job_report_status_id": 2,  # Report Ongoing
                "quote_amount": 200000,
                "job_start_date": date.today() - timedelta(days=20),
                "job_end_date": date.today() - timedelta(days=5),
                "report_finish_date": None
            }
        ]
        
        created_jobs = []
        for job_data in test_jobs:
            existing_job = db.query(Job).filter(Job.job_no == job_data["job_no"]).first()
            if not existing_job:
                job = Job(**job_data)
                db.add(job)
                db.commit()
                db.refresh(job)
                created_jobs.append(job)
                print(f"✓ Created test job: {job.job_no} - {job.product_service}")
            else:
                created_jobs.append(existing_job)
                print(f"✓ Using existing job: {existing_job.job_no}")
        
        # Create test financial records with pending payments
        financial_data = [
            {
                "job_id": created_jobs[0].job_id,
                "invoice_number": "PROG/2026/001",
                "invoice_date": date.today() - timedelta(days=8),
                "invoice_net_amount": 127119,
                "invoice_gst_amount": 22881,
                "invoice_gross_amount": 150000,
                "payment_due_date": date.today() + timedelta(days=22),
                "payment_date": None,
                "invoice_payment_status": "Not Paid"
            },
            {
                "job_id": created_jobs[1].job_id,
                "invoice_number": "PROG/2026/002",
                "invoice_date": date.today() - timedelta(days=3),
                "invoice_net_amount": 169492,
                "invoice_gst_amount": 30508,
                "invoice_gross_amount": 200000,
                "payment_due_date": date.today() + timedelta(days=27),
                "payment_date": None,
                "invoice_payment_status": "Partially Paid"
            }
        ]
        
        for fin_data in financial_data:
            existing_fin = db.query(JobFinancial).filter(JobFinancial.job_id == fin_data["job_id"]).first()
            if not existing_fin:
                financial = JobFinancial(**fin_data)
                db.add(financial)
                db.commit()
                db.refresh(financial)
                print(f"✓ Created financial record: {financial.invoice_number} - {financial.invoice_payment_status}")
            else:
                # Update existing record to pending status
                existing_fin.invoice_payment_status = fin_data["invoice_payment_status"]
                db.commit()
                print(f"✓ Updated existing financial record: {existing_fin.invoice_number}")
        
        print("\n🎉 Test data created successfully!")
        print("You can now check the Pending Invoices page to see the sample data.")
        
    except Exception as e:
        print(f"❌ Error creating test data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating test data for Pending Invoices functionality...")
    create_test_data()