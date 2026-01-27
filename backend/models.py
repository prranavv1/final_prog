from sqlalchemy import Column, String, Integer, BigInteger
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)   # 🔥 MUST be here
   

class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(BigInteger, primary_key=True, index=True)
    customer_name = Column(String(100))
