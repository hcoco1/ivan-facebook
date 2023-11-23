from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
from config import db
from datetime import datetime
from hashlib import md5


# Replace this with your actual user model
class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @validates("email")
    def validate_email(self, key, address):
        assert "@" in address
        return address

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "username": self.username, "email": self.email}

    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        return True  # You can add custom authentication logic if needed

    def is_active(self):
        return True  # You can add custom activation logic if needed

    def is_anonymous(self):
        return False

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)