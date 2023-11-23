#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, redirect, url_for

# Remote library imports
from flask_cors import cross_origin
from flask import request
from flask_restful import Resource
from flask_login import (
    LoginManager,
    UserMixin,
    login_user as flask_login_user,
    login_required,
    logout_user,
    current_user,
)

# Local imports
from config import app, db, api
from models import User

app.secret_key = "my_super_secret_key_that_should_be_random_and_secure"
# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


@app.route("/login", methods=["POST"])
@cross_origin()
def login_user_custom():
    # Get the user details from the request
    user_details = request.json

    # Check if the user already exists
    user = User.query.filter_by(email=user_details["email"]).first()

    # If the user does not exist, return an error message
    if not user:
        return jsonify({"message": "User does not exist!"}), 400

    # If the user exists, check if the password is correct using the check_password method
    if not user.check_password(user_details["password"]):
        return jsonify({"message": "Incorrect password!"}), 400

    # Use login_user to log in the user
    flask_login_user(user)

    # Return a success message
    return jsonify(user.to_dict()), 200


@app.route("/logout")
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"})


@app.route("/register", methods=["POST"])
@cross_origin()
def register_user():
    user_details = request.json
    print(user_details)

    user = User.query.filter_by(email=user_details["email"]).first()

    if user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(
        name=user_details["name"],
        username=user_details["username"],
        email=user_details["email"],
    )

    # Here, use 'password' from user_details to hash and set
    new_user.set_password(user_details["password"])

    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()

    return jsonify(user_dict), 201


if __name__ == "__main__":
    app.run(port=5555, debug=True)
