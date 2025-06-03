from database import db

class Genre(db.Model):
    __tablename__ = 'genre'
    genre_id = db.Column("genre_id", db.Integer, primary_key=True)
    genre_name = db.Column("genre_name", db.String(120))  # Zmieniono z genres_name na genre_name

    def to_dict(self):
        return {'genre_id': self.genre_id, 'genre_name': self.genre_name}  # Zmieniono genres_name na genre_name