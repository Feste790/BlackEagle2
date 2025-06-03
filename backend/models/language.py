from database import db

class MovieLanguage(db.Model):
    __tablename__ = 'movie_language'
    movie_language_id = db.Column("movie_language_id", db.Integer, primary_key=True)
    language = db.Column("language", db.String(255))
    movie_id = db.Column("movie_id", db.Integer, db.ForeignKey('movies.movie_id'))

    def to_dict(self):
        return {
            'movie_language_id': self.movie_language_id,
            'language': self.language,
            'movie_id': self.movie_id
        }