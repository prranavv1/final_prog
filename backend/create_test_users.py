#!/usr/bin/env python3

"""
Script to create test users for different roles in the system.
Run this script to set up demo users for testing the application.
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User, Base
from passlib.context import CryptContext

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    password = password[:72]  # ensure bcrypt safe
    return pwd_context.hash(password)

def create_test_users():
    """Create test users for all roles"""
    
    db = SessionLocal()
    
    try:
        # Define test users with their credentials
        test_users = [
            {
                "username": "admin",
                "password": "admin123",
                "role": "ADMIN"
            },
            {
                "username": "senior_eng",
                "password": "senior123", 
                "role": "SENIOR_ENGINEER"
            },
            {
                "username": "junior_eng",
                "password": "junior123",
                "role": "JUNIOR_ENGINEER"
            }
        ]
        
        print("🔧 Creating test users...")
        print("-" * 50)
        
        for user_data in test_users:
            # Check if user already exists
            existing_user = db.query(User).filter(User.username == user_data["username"]).first()
            
            if existing_user:
                # Update existing user's password and role
                existing_user.password = hash_password(user_data["password"])
                existing_user.role = user_data["role"]
                db.commit()
                print(f"✅ Updated existing user: {user_data['username']}")
            else:
                # Create new user
                new_user = User(
                    username=user_data["username"],
                    password=hash_password(user_data["password"]),
                    role=user_data["role"]
                )
                db.add(new_user)
                db.commit()
                print(f"✅ Created new user: {user_data['username']}")
            
            print(f"   📧 Username: {user_data['username']}")
            print(f"   🔑 Password: {user_data['password']}")
            print(f"   👤 Role: {user_data['role']}")
            print()
        
        print("🎉 Test users setup complete!")
        print("-" * 50)
        print("📋 Login Credentials Summary:")
        print()
        print("👑 ADMIN (Full Access):")
        print("   Username: admin")
        print("   Password: admin123")
        print()
        print("👨‍💼 SENIOR ENGINEER (Work + Assets + Profile):")
        print("   Username: senior_eng") 
        print("   Password: senior123")
        print()
        print("👨‍🔧 JUNIOR ENGINEER (Work + Profile):")
        print("   Username: junior_eng")
        print("   Password: junior123")
        print()
        print("🌐 Access the app at: http://localhost:5177")
        
    except Exception as e:
        print(f"❌ Error creating users: {e}")
        db.rollback()
    finally:
        db.close()

def list_existing_users():
    """List all existing users in the database"""
    
    db = SessionLocal()
    
    try:
        users = db.query(User).all()
        
        if not users:
            print("📭 No users found in database.")
            return
            
        print("📋 Existing Users in Database:")
        print("-" * 50)
        
        for user in users:
            print(f"👤 Username: {user.username}")
            print(f"   Role: {user.role}")
            print(f"   ID: {user.id}")
            print()
            
    except Exception as e:
        print(f"❌ Error fetching users: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 User Management Script")
    print("=" * 50)
    
    # First, list existing users
    list_existing_users()
    
    # Then create/update test users
    create_test_users()