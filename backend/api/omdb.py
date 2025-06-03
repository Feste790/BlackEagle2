from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
import requests
from models.movie import Movie  # Poprawiono import z models.movies na models.movie
from database import db
import logging

omdb_bp = Blueprint('omdb', __name__)

# Configure logging
logging.basicConfig(filename='backend/app.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@omdb_bp.route('/fetch-omdb', methods=['POST'])
@jwt_required()
def fetch_omdb():
    try:
        if not request.is_json:
            logging.warning('Fetch OMDB failed: Content-Type is not application/json')
            return jsonify({'error': 'Content-Type must be application/json'}), 415

        data = request.get_json()
        title = data.get('title')

        if not title:
            logging.warning('Fetch OMDB failed: missing title')
            return jsonify({'error': 'Missing title parameter'}), 400

        api_key = 'YOUR_OMDB_API_KEY'  # Zamieñ na swój klucz API OMDB
        url = f'http://www.omdbapi.com/?t={title}&apikey={api_key}'
        response = requests.get(url)

        if response.status_code != 200:
            logging.error(f'OMDB API error: {response.status_code}')
            return jsonify({'error': 'Failed to fetch data from OMDB'}), 500

        movie_data = response.json()

        if movie_data.get('Response') == 'False':
            logging.warning(f'OMDB API returned no data for title: {title}')
            return jsonify({'error': 'Movie not found'}), 404

        # Sprawdzenie, czy film ju¿ istnieje
        existing_movie = Movie.query.filter_by(title=movie_data['Title']).first()
        if existing_movie:
            logging.info(f'Movie already exists: {movie_data["Title"]}')
            return jsonify({'message': 'Movie already exists', 'movie': existing_movie.to_dict()}), 200

        # Tworzenie nowego filmu
        new_movie = Movie(
            title=movie_data['Title'],
            released=movie_data.get('Released'),
            runtime=movie_data.get('Runtime', '').replace(' min', ''),
            country=movie_data.get('Country'),
            imdb_rating=float(movie_data.get('imdbRating', 0)) if movie_data.get('imdbRating') else None,
            imdb_votes=int(movie_data.get('imdbVotes', 0).replace(',', '')) if movie_data.get('imdbVotes') else None,
            plot=movie_data.get('Plot'),
            poster=movie_data.get('Poster'),
            prod_year=movie_data.get('Year'),
            rated=movie_data.get('Rated'),
            box_office=movie_data.get('BoxOffice'),
            metacritic=int(movie_data.get('Metacritic', 0)) if movie_data.get('Metacritic') else None,
            rotten_tomatoes=int(movie_data.get('Ratings', [{}])[0].get('Value', '0').replace('%', '')) if movie_data.get('Ratings') else None,
            awards=movie_data.get('Awards'),
            movie_type='movie' if movie_data.get('Type') == 'movie' else 'series'
        )
        db.session.add(new_movie)
        db.session.commit()
        logging.info(f'New movie added: {movie_data["Title"]}')
        return jsonify({'message': 'Movie added successfully', 'movie': new_movie.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f'Error in fetch_omdb: {str(e)}')
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500