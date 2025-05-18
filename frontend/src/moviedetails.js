import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const formatPolishDate = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const months = [
            'Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca',
            'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        fetch(`https://backend-g7rx.onrender.com/movie/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched movie:", data);
                if (!data.error) {
                    setMovie(data);
                } else {
                    console.error("API error:", data.error);
                }
            })
            .catch(err => console.error("Fetch error:", err));
    }, [id]);

    if (!movie) return <p>Ładowanie...</p>;

    return (
        <div className="movie-details">
            <img
                className="movie-details-poster"
                src={movie.poster || 'https://via.placeholder.com/200x300'}
                alt={movie.title}
            />
            <div className="movie-details-info">
                <h2 className="TitleDetails">{movie.title}</h2>
                <p><strong>Data premiery:</strong> {formatPolishDate(movie.released)}</p>
                <p><strong>Rok produkcji:</strong> {movie.prod_year}</p>
                <p><strong>Oznaczenie wiekowe:</strong> {movie.rated}</p>
                <p><strong>Długość trwania:</strong> {movie.runtime} min</p>
                <p><strong>Kraj pochodzenia:</strong> {movie.country}</p>
                <p><strong>Box Office:</strong> {movie.box_office}</p>
                <p><strong>IMDb:</strong> {movie.imdb_rating} / 10 ({movie.imdb_votes?.toLocaleString() || 0} głosów)</p>
                <p><strong>Metacritic:</strong> {movie.metacritic ? `${movie.metacritic}/100` : 'Brak danych'}</p>
                <p><strong>Rotten Tomatoes:</strong> {movie.rotten_tomatoes ? `${movie.rotten_tomatoes}%` : 'Brak danych'}</p>
                <p><strong>Nagrody:</strong> {movie.awards || 'Brak danych'}</p>
                <p className="movie-description-watched">{movie.plot}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
