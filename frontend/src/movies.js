import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Movies({ filteredMovies }) {
    const movieList = filteredMovies.filter(movie => movie.movie_type === 'movie');

    return (
        <div className="movies-page">
            <h1 className="movies-title">Filmy</h1>
            <div className="movies-grid">
                {movieList.map((movie, i) => (
                    <Link to={`/movie/${movie.movie_id}`} className="movies-card" key={i}>
                        <div className="movies-poster-wrapper">
                            <img
                                className="movies-poster"
                                src={movie.poster || 'https://via.placeholder.com/150x220'}
                                alt={movie.title}
                            />
                        </div>
                        <div className="movies-info">
                            <h2 className="movies-name">{movie.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Movies;
