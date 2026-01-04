from sqlalchemy import Column, String, Integer, BigInteger, ForeignKey
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(BigInteger, primary_key=True, index=True)
    customer_name = Column(String(100))
