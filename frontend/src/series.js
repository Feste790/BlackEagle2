import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Series({ filteredMovies, apiUrl }) {
    const seriesList = filteredMovies.filter((movie) => movie.movie_type === 'series');

    return (
        <div className="series-page">
            <h1 className="series-title">Seriale</h1>
            {seriesList.length === 0 ? (
                <p style={{ color: '#f5c518', textAlign: 'center' }}>Brak seriali do wyœwietlenia</p>
            ) : (
                <div className="series-grid">
                    {seriesList.map((movie, i) => (
                        <Link to={`/movie/${movie.movie_id}`} className="series-card" key={movie.movie_id || i}>
                            <div className="series-poster-wrapper">
                                <img
                                    className="series-poster"
                                    src={movie.poster || 'https://via.placeholder.com/150x220'}
                                    alt={movie.title || 'Brak tytu³u'}
                                />
                            </div>
                            <div className="series-info">
                                <h2 className="series-name">{movie.title || 'Brak tytu³u'}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Series;