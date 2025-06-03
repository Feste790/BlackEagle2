# -*- coding: utf-8 -*-
from database import db

class MoviePeople(db.Model):
    __tablename__ = 'movie_people'
    movie_people_id = db.Column("movie_people_id", db.Integer, primary_key=True)
    people_id = db.Column("people_id", db.Integer, db.ForeignKey('people.people_id'))
    movie_id = db.Column("movie_id", db.Integer, db.ForeignKey('movies.movie_id'))
    role = db.Column("role", db.String(30), nullable=False)

    def to_dict(self):
        return {
            'movie_people_id': self.movie_people_id,
            'people_id': self.people_id,
            'movie_id': self.movie_id,
            'role': self.role
        }