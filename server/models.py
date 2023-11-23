from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Table, Float, DateTime, String, Integer, Column
from datetime import datetime


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

  

    def to_dict(self):
        return {"id": self.id, "username": self.username, "email": self.email}

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"
