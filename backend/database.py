from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)  # Powi�zanie instancji db z aplikacj�
    with app.app_context():
        # Opcjonalnie: tworzenie tabel, je�li nie istniej�
        # db.create_all()  # Usu� lub skomentuj, je�li u�ywasz Flask-Migrate
        return db  # Opcjonalne, je�li chcesz zwr�ci� instancj�