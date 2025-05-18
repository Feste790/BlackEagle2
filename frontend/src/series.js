import React from 'react';
import './App.css';

function Series({ filteredMovies }) {
    const seriesList = filteredMovies.filter(movie => movie.movie_type === 'series');

    return (
        <div className="series-page">
            <h1 className="series-title">Seriale</h1>
            <div className="series-grid">
                {seriesList.map((movie, i) => (
                    <div className="series-card" key={i}>
                        <div className="series-poster-wrapper">
                            <img
                                className="series-poster"
                                src={movie.poster || 'https://via.placeholder.com/150x220'}
                                alt={movie.title}
                            />
                        </div>
                        <div className="series-info">
                            <h2 className="series-name">{movie.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Series;
