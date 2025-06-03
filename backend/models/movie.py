from database import db

class Movie(db.Model):
    __tablename__ = 'movie'

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    prod_year = db.Column(db.Integer, nullable=True)
    rated = db.Column(db.String(10), nullable=True)
    released = db.Column(db.Date, nullable=True)
    runtime = db.Column(db.Integer, nullable=True)
    plot = db.Column(db.Text, nullable=True)
    country = db.Column(db.String(100), nullable=True)
    awards = db.Column(db.Text, nullable=True)
    poster = db.Column(db.String(255), nullable=True)
    tmdb_rating = db.Column(db.Float, nullable=True)
    rotten_tomatoes = db.Column(db.Float, nullable=True)
    metacritic = db.Column(db.Float, nullable=True)
    imdb_rating = db.Column(db.Float, nullable=True)
    imdb_votes = db.Column(db.Integer, nullable=True)
    imdb_id = db.Column(db.String(20), nullable=True)
    movie_type = db.Column(db.String(50), nullable=True)
    box_office = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'movie_id': self.movie_id,
            'title': self.title,
            'prod_year': self.prod_year,
            'rated': self.rated,
            'released': self.released.isoformat() if self.released else None,
            'runtime': self.runtime,
            'plot': self.plot,
            'country': self.country,
            'awards': self.awards,
            'poster': self.poster,
            'tmdb_rating': self.tmdb_rating,
            'rotten_tomatoes': self.rotten_tomatoes,
            'metacritic': self.metacritic,
            'imdb_rating': self.imdb_rating,
            'imdb_votes': self.imdb_votes,
            'imdb_id': self.imdb_id,
            'movie_type': self.movie_type,
            'box_office': self.box_office
        }