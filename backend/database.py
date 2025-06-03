from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)  # Powi¹zanie instancji db z aplikacj¹
    with app.app_context():
        # Opcjonalnie: tworzenie tabel, jeœli nie istniej¹
        # db.create_all()  # Usuñ lub skomentuj, jeœli u¿ywasz Flask-Migrate
        return db  # Opcjonalne, jeœli chcesz zwróciæ instancjê