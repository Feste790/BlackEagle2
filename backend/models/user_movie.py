# user_movie_model.py
from database import db

class AppUser_Movie(db.Model):
    __tablename__ = 'appuser_movie'  
    user_movie_id = db.Column("user_movie_id", db.Integer, primary_key=True)
    appuser_id = db.Column("appuser_id", db.Integer, db.ForeignKey('appuser.appuser_id'))
    movie_id = db.Column("movie_id", db.Integer, db.ForeignKey('movie.movie_id'))
    user_rated = db.Column("user_rating", db.String(30)) 

    def to_dict(self):
        return {
            "user_movie_id": self.user_movie_id,
            "appuser_id": self.appuser_id,
            "movie_id": self.movie_id,
            "user_rating": self.user_rated
        }