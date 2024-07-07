# app/auth/routes.py
from flask import Blueprint, request, jsonify
from app.models import create_user, create_user_session
from .utils import validate_signup_data, validate_login_data
from bson.objectid import ObjectId
from datetime import datetime
from app import mongo

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        error = validate_signup_data(data)
        if error:
            return jsonify({"error": error}), 400

        response, status_code = create_user(data)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        error = validate_login_data(data)
        if error:
            return jsonify({"error": error}), 400

        user = mongo.Users.find_one({"username": data['username']})
        if not user or not data['password']:
            return jsonify({"error": "Invalid username or password"}), 400
        if user['password'] != data['password']:
            return jsonify({"error": "Invalid username or password"}), 400
        if user['role'] is None:
            return jsonify({"error": "User role not assigned"}), 400
        
        login_time = datetime.utcnow()
        response, status_code = create_user_session(data['username'], login_time)
        return jsonify(response), status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route("/pending-users", methods=["GET"])
def get_pending_users():
    users = list(mongo.Users.find({"role": None}))
    for user in users:
        user["_id"] = str(user["_id"])
    return jsonify(users), 200

@auth_bp.route("/update-role", methods=["POST"])
def update_user_role():
    data = request.get_json()
    user_id = data.get("user_id")
    new_role = data.get("role")
    result = mongo.Users.update_one({"_id": ObjectId(user_id)}, {"$set": {"role": new_role}})
    if result.modified_count == 1:
        return jsonify({"message": "User role updated successfully"}), 200
    return jsonify({"error": "Failed to update user role"}), 400

@auth_bp.route("/delete-user", methods=["POST"])
def delete_user():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        result = mongo.Users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "User deleted successfully"}), 200
        return jsonify({"error": "Failed to delete user"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
