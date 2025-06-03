from flask import Blueprint, jsonify, request
from database import db
from models.movie import Movie
from models.movie_genre import MovieGenre
from models.user_movie import AppUser_Movie
from flask_jwt_extended import jwt_required, get_jwt_identity

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    current_user_id = get_jwt_identity()
    movie_type = request.args.get('type', None)

    print(f"User ID: {current_user_id}, Movie Type: {movie_type}")  # Debug

    watched_movies = AppUser_Movie.query.filter_by(appuser_id=current_user_id).all()
    print(f"Watched Movies: {[movie.movie_id for movie in watched_movies]}")  # Debug
    if not watched_movies:
        return jsonify({"message": "Brak obejrzanych filmow.", "recommendations": []}), 200

    watched_movie_ids = [movie.movie_id for movie in watched_movies]
    genres = db.session.query(MovieGenre.genre_id).filter(MovieGenre.movie_id.in_(watched_movie_ids)).distinct().all()
    genre_ids = [genre[0] for genre in genres]
    print(f"Genre IDs: {genre_ids}")  # Debug

    if not genre_ids:
        return jsonify({"message": "Brak gatunkow do analizy.", "recommendations": []}), 200

    query = (
        db.session.query(Movie)
        .join(MovieGenre, Movie.movie_id == MovieGenre.movie_id)
        .filter(MovieGenre.genre_id.in_(genre_ids))
        .filter(~Movie.movie_id.in_(watched_movie_ids))
    )

    if movie_type:
        query = query.filter(Movie.movie_type == movie_type)

    recommended_movies = query.order_by(Movie.imdb_rating.desc()).limit(20).all()
    print(f"Recommended Movies: {[movie.movie_id for movie in recommended_movies]}")  # Debug

    if not recommended_movies:
        return jsonify({"message": "Brak rekomendacji dla podanych kryteriow.", "recommendations": []}), 200

    recommendations = [movie.to_dict() for movie in recommended_movies]
    return jsonify({"message": "Rekomendacje na podstawie gatunkow.", "recommendations": recommendations}), 200