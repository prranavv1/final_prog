from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def reset_admin_password():
    db = SessionLocal()
    
    # Find admin user
    admin = db.query(User).filter(User.username == "admin").first()
    
    if admin:
        # Set new password to "admin123"
        new_password = "admin123"
        admin.password = pwd_context.hash(new_password[:72])
        db.commit()
        print(f"✅ Password reset successfully for user: {admin.username}")
        print(f"   Username: admin")
        print(f"   New Password: admin123")
    else:
        print("❌ Admin user not found")
    
    db.close()

if __name__ == "__main__":
    reset_admin_password()
