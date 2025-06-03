from werkzeug.security import generate_password_hash, check_password_hash
from models.user import AppUser
from database import db
import logging
from datetime import date

# Configure logging
logging.basicConfig(
    filename='backend/app.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def register_user(first_name, last_name, email, username, password):  # Zmieniono e_mail na email
    existing_user = AppUser.query.filter_by(username=username).first()
    if existing_user:
        logging.warning(f'Registration failed: username {username} already exists')
        return None, "Username already exists"
    existing_email = AppUser.query.filter_by(email=email).first()  # Zmieniono e_mail na email
    if existing_email:
        logging.warning(f'Registration failed: email {email} already exists')
        return None, "Email already exists"

    hashed_password = generate_password_hash(password)
    user = AppUser(
        first_name=first_name,
        last_name=last_name,
        email=email,  # Zmieniono e_mail na email
        username=username,
        passwordhash=hashed_password,
        createdat=date.today()
    )
    db.session.add(user)
    db.session.commit()
    logging.info(f'User created: {username}')
    return user, None