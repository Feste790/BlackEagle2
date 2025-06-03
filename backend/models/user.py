# user.py
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date

class AppUser(db.Model):
    __tablename__ = 'appuser'

    appuser_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)  # Powrót do password zamiast passwordhash
    created_at = db.Column(db.Date, nullable=True, default=date.today)

    def __init__(self, first_name, last_name, email, username, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.set_password(password)  # Haszowanie w metodzie set_password


    def set_password(self, password):
        self.password = generate_password_hash(password)  # U¿ywamy password zamiast passwordhash

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'appuser_id': self.appuser_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'username': self.username,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }