from sqlalchemy import create_engine, text
from database import DATABASE_URL

engine = create_engine(DATABASE_URL)

def add_columns():
    with engine.connect() as connection:
        try:
            # Check/Add quote_amount
            try:
                connection.execute(text("ALTER TABLE jobs ADD COLUMN quote_amount FLOAT DEFAULT 0"))
                print("Added quote_amount column")
            except Exception as e:
                print(f"quote_amount might already exist: {e}")

            # Check/Add remarks
            try:
                connection.execute(text("ALTER TABLE jobs ADD COLUMN remarks TEXT"))
                print("Added remarks column")
            except Exception as e:
                print(f"remarks might already exist: {e}")

            # Check/Add report_finish_date
            try:
                connection.execute(text("ALTER TABLE jobs ADD COLUMN report_finish_date DATE"))
                print("Added report_finish_date column")
            except Exception as e:
                print(f"report_finish_date might already exist: {e}")

            connection.commit()
            print("Schema update completed successfully.")
        except Exception as e:
            print(f"Error updating schema: {e}")

if __name__ == "__main__":
    add_columns()
