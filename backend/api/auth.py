# auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import AppUser  # Poprawny import
from database import db
import logging

auth_bp = Blueprint('auth', __name__)

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        if not all([email, username, password]):
            return jsonify({'error': 'Missing required fields'}), 400

        if AppUser.query.filter_by(email=email).first() or AppUser.query.filter_by(username=username).first():
            return jsonify({'error': 'Email or username already exists'}), 400

        new_user = AppUser(first_name=first_name, last_name=last_name, email=email, username=username, password=password)
        new_user.set_password(password)  # Haszowanie has³a
        db.session.add(new_user)
        db.session.commit()
        logging.info(f"User registered: {email}")
        return jsonify({'message': 'User registered successfully', 'user_id': new_user.appuser_id}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Registration error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400

        user = AppUser.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401

        access_token = create_access_token(identity=user.appuser_id)
        logging.info(f"User logged in: {email}")
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    except Exception as e:
        logging.error(f"Login error: {str(e)}")
        return jsonify({'error': str(e)}), 500