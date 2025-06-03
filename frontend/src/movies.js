import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Movies({ filteredMovies, apiUrl }) {
    const movieList = filteredMovies.filter((movie) => movie.movie_type === 'movie');

    return (
        <div className="movies-page">
            <h1 className="movies-title">Filmy</h1>
            {movieList.length === 0 ? (
                <p style={{ color: '#f5c518', textAlign: 'center' }}>Brak filmów do wyœwietlenia</p>
            ) : (
                <div className="movies-grid">
                    {movieList.map((movie, i) => (
                        <Link to={`/movie/${movie.movie_id}`} className="movies-card" key={movie.movie_id || i}>
                            <div className="movies-poster-wrapper">
                                <img
                                    className="movies-poster"
                                    src={movie.poster || 'https://via.placeholder.com/150x220'}
                                    alt={movie.title || 'Brak tytu³u'}
                                />
                            </div>
                            <div className="movies-info">
                                <h2 className="movies-name">{movie.title || 'Brak tytu³u'}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movies;