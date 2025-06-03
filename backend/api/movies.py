# api/movies.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_movie import AppUser_Movie
from models.movie import Movie
from models.user import AppUser
from database import db
import logging

movies_bp = Blueprint('movies', __name__)

logging.basicConfig(filename='app.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@movies_bp.route('/movies', methods=['GET'])
@jwt_required()
def get_movies():
    try:
        movies = Movie.query.all()
        logger.debug(f"Retrieved {len(movies)} movies")
        return jsonify([movie.to_dict() for movie in movies]), 200
    except Exception as e:
        logger.error(f"Error in get_movies: {str(e)}")
        return jsonify({'error': str(e)}), 500

@movies_bp.route('/watched', methods=['GET'])
@jwt_required()
def get_watched_movies():
    try:
        current_user_id = get_jwt_identity()
        print(f"User ID: {current_user_id}")
        logger.debug(f"Fetching watched movies for user_id: {current_user_id}")

        watched_entries = AppUser_Movie.query.filter_by(appuser_id=current_user_id).all()
        logger.debug(f"Found {len(watched_entries)} entries in AppUser_Movie: {[entry.movie_id for entry in watched_entries]}")

        if not watched_entries:
            return jsonify({"message": "Brak obejrzanych filmow.", "movies": []}), 200

        movie_ids = [entry.movie_id for entry in watched_entries]
        logger.debug(f"Movie IDs to fetch: {movie_ids}")

        watched_movies = Movie.query.filter(Movie.movie_id.in_(movie_ids)).all()
        logger.debug(f"Found {len(watched_movies)} watched movies: {[m.movie_id for m in watched_movies]}")

        all_movies = Movie.query.all()
        logger.debug(f"Total movies in database: {len(all_movies)}")

        movies = [movie.to_dict() for movie in watched_movies]
        return jsonify({"message": "Obejrzane filmy i seriale.", "movies": movies}), 200
    except Exception as e:
        logger.error(f"Error in get_watched_movies: {str(e)}")
        return jsonify({'error': f"Blad serwera: {str(e)}"}), 500

@movies_bp.route('/watched/add', methods=['POST'])
@jwt_required()
def add_watched_movie():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        movie_id = data.get('movie_id')

        if not movie_id:
            return jsonify({'error': 'Missing movie_id'}), 400

        user = AppUser.query.get(user_id)
        movie = Movie.query.get(movie_id)

        if not user or not movie:
            return jsonify({'error': 'User or movie not found'}), 404

        if movie not in user.watched:
            user.watched.append(movie)
            db.session.commit()
            return jsonify({'message': 'Movie added to watched list', 'movie': movie.to_dict()}), 200
        return jsonify({'message': 'Movie already in watched list'}), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error in add_watched_movie: {str(e)}")
        return jsonify({'error': str(e)}), 500
