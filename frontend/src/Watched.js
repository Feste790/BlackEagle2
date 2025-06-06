import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Watched = ({ filteredMovies, apiUrl }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchedMovies = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Brak tokenu autoryzacji');
                }
                const response = await fetch(`${apiUrl}/watched`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Błąd przy pobieraniu danych: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchWatchedMovies();
    }, [apiUrl]);

    const formatPolishDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const months = [
            'Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca',
            'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia',
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    if (loading) return <p style={{ color: '#f5c518', textAlign: 'center' }}>Ładowanie...</p>;
    if (error) return <p style={{ color: '#f5c518', textAlign: 'center' }}>Błąd: {error}</p>;

    const displayMovies = movies.length > 0 ? movies : filteredMovies;

    return (
        <div className="watched-container">
            <h1 className="header_text_watched">Obejrzane Filmy</h1>
            <div className="movie-list-watched">
                {displayMovies.map((movie, i) => (
                    <div className="movie-item-watched" key={movie.movie_id || i}>
                        <Link to={`/movie/${movie.movie_id}`} className="movie-poster-container">
                            <img
                                className="movie-poster-watched"
                                src={movie.poster || 'https://via.placeholder.com/150x220'}
                                alt={movie.title || 'Brak tytułu'}
                            />
                        </Link>
                        <div className="movie-details-watched">
                            <h2>{movie.title || 'Brak tytułu'}</h2>
                            <p>
                                <strong>Data premiery:</strong> {formatPolishDate(movie.released)}
                            </p>
                            <p>
                                <strong>Długość trwania:</strong> {movie.runtime || 'Brak danych'} min
                            </p>
                            <p>
                                <strong>Kraj pochodzenia:</strong> {movie.country || 'Brak danych'}
                            </p>
                            <p>
                                <strong>IMDb:</strong> {movie.imdb_rating || 'Brak danych'} / 10 (
                                {movie.imdb_votes?.toLocaleString() || 0} głosów)
                            </p>
                            <p className="movie-description-watched">{movie.plot || 'Brak opisu'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watched;