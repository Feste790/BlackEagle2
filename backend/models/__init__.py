from flask_sqlalchemy import SQLAlchemy
from .user import AppUser
from .movie import Movie

db = SQLAlchemy()

# Model dla tabeli poœredniej AppUser_Movie
class AppUser_Movie(db.Model):
    __tablename__ = 'appuser_movie'
    user_movie_id = db.Column(db.Integer, primary_key=True)
    appuser_id = db.Column(db.Integer, db.ForeignKey('appuser.appuser_id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.movie_id'), nullable=False)
    user_rating = db.Column(db.Float, nullable=True)
    watched_date = db.Column(db.Date, nullable=True)

    appuser = db.relationship('AppUser', backref=db.backref('user_movies', lazy='dynamic'))
    movie = db.relationship('Movie', backref=db.backref('user_movies', lazy='dynamic'))