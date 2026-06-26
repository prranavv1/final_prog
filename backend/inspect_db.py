from sqlalchemy import create_engine, text
from database import DATABASE_URL
import sys

# Force utf-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')

engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    try:
        with open("db_content.txt", "w", encoding="utf-8") as f:
            f.write("--- START JOB WORK STATUS ---\n")
            result = connection.execute(text("SELECT * FROM job_work_status"))
            rows = result.fetchall()
            for row in rows:
                f.write(f"ID: {row[0]}, Code: {row[1]}, Name: {row[2]}\n")
            f.write("--- END JOB WORK STATUS ---\n")

            f.write("\n--- START JOB REPORT STATUS ---\n")
            result = connection.execute(text("SELECT * FROM job_report_status"))
            rows = result.fetchall()
            for row in rows:
                f.write(f"ID: {row[0]}, Code: {row[1]}, Name: {row[2]}\n")
            f.write("--- END JOB REPORT STATUS ---\n")
            
        print("Done writing to db_content.txt")

    except Exception as e:
        print(f"Error: {e}")
