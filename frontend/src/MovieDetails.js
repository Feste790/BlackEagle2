import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function MovieDetails({ apiUrl }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

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

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Brak tokenu autoryzacji');
                }
                const response = await fetch(`${apiUrl}/movies`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Błąd pobierania filmu: ${response.status}`);
                }
                const data = await response.json();
                const selectedMovie = data.find(movie => movie.movie_id === parseInt(id));
                if (!selectedMovie) {
                    throw new Error('Film nie znaleziony');
                }
                setMovie(selectedMovie);
            } catch (err) {
                setError('Wystąpił błąd: ' + err.message);
                console.error('Fetch error:', err);
            }
        };
        fetchMovie();
    }, [apiUrl, id]);

    if (error) return <p style={{ color: '#f5c518', textAlign: 'center' }}>{error}</p>;
    if (!movie) return <p style={{ color: '#f5c518', textAlign: 'center' }}>Ładowanie...</p>;

    return (
        <div className="movie-details">
            <img
                className="movie-details-poster"
                src={movie.poster || 'https://via.placeholder.com/200x300'}
                alt={movie.title || 'Brak tytułu'}
            />
            <div className="movie-details-info">
                <h2 className="TitleDetails">{movie.title || 'Brak tytułu'}</h2>
                <p>
                    <strong>Data premiery:</strong> {formatPolishDate(movie.released)}
                </p>
                <p>
                    <strong>Rok produkcji:</strong> {movie.prod_year || 'Brak danych'}
                </p>
                <p>
                    <strong>Oznaczenie wiekowe:</strong> {movie.rated || 'Brak danych'}
                </p>
                <p>
                    <strong>Długość trwania:</strong> {movie.runtime || 'Brak danych'} min
                </p>
                <p>
                    <strong>Kraj pochodzenia:</strong> {movie.country || 'Brak danych'}
                </p>
                <p>
                    <strong>Box Office:</strong> {movie.box_office || 'Brak danych'}
                </p>
                <p>
                    <strong>IMDb:</strong> {movie.imdb_rating || 'Brak danych'} / 10 (
                    {movie.imdb_votes?.toLocaleString() || 0} głosów)
                </p>
                <p>
                    <strong>Metacritic:</strong>{' '}
                    {movie.metacritic ? `${movie.metacritic}/100` : 'Brak danych'}
                </p>
                <p>
                    <strong>Rotten Tomatoes:</strong>{' '}
                    {movie.rotten_tomatoes ? `${movie.rotten_tomatoes}%` : 'Brak danych'}
                </p>
                <p>
                    <strong>Nagrody:</strong> {movie.awards || 'Brak danych'}
                </p>
                <p className="movie-description-watched">{movie.plot || 'Brak opisu'}</p>
            </div>
        </div>
    );
}

export default MovieDetails;