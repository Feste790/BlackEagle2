# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
import logging
from config import Config
from api.movies import movies_bp
from api.auth import auth_bp
from api.omdb import omdb_bp
from api.csv import csv_bp
from api.recommendations import recommendations_bp
from database import init_db
from dotenv import load_dotenv
import os

# Ładujemy zmienne środowiskowe z pliku .env
load_dotenv()

app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Initialize database (pierwsze w kolejności)
db = init_db(app)

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize extensions
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}})

# Inicjalizacja Flask-Migrate
migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(movies_bp, url_prefix='/')
app.register_blueprint(auth_bp, url_prefix='/')
app.register_blueprint(omdb_bp, url_prefix='/')
app.register_blueprint(csv_bp, url_prefix='/')
app.register_blueprint(recommendations_bp, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)