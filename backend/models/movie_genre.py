# -*- coding: utf-8 -*-
from database import db

class MovieGenre(db.Model):
    __tablename__ = 'movie_genre'
    movie_genres_id = db.Column("movie_genre_id", db.Integer, primary_key=True)
    movie_id = db.Column("movie_id", db.Integer, db.ForeignKey('movies.movie_id'))
    genre_id = db.Column("genre_id", db.Integer, db.ForeignKey('genres.genre_id'))

    def to_dict(self):
        return {
            'movie_genres_id': self.movie_genres_id,
            'movie_id': self.movie_id,
            'genre_id': self.genre_id
        }