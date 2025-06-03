import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Movies from './Movies';
import Series from './Series';
import Watched from './Watched';
import MovieDetails from './MovieDetails';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const apiUrl = 'https://backend-g7rx.onrender.com';

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // Zmieniono z 'token' na 'access_token'
        if (token) {
            setIsAuthenticated(true);
            const fetchMovies = async () => {
                try {
                    const response = await fetch(`${apiUrl}/movies`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setMovies(data);
                } catch (err) {
                    console.error('B³¹d pobierania filmów:', err);
                    setMovies([]);
                }
            };
            fetchMovies();
        }
    }, [apiUrl]);

    const filteredMovies = movies.filter((movie) =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="App">
            <Router>
                {isAuthenticated && <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route
                        path="/login"
                        element={<Login setIsAuthenticated={setIsAuthenticated} apiUrl={apiUrl} />}
                    />
                    <Route
                        path="/register"
                        element={<Register setIsAuthenticated={setIsAuthenticated} apiUrl={apiUrl} />}
                    />
                    <Route
                        path="/home"
                        element={
                            isAuthenticated ? (
                                <Home filteredMovies={filteredMovies} apiUrl={apiUrl} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            isAuthenticated ? (
                                <Movies filteredMovies={filteredMovies} apiUrl={apiUrl} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/series"
                        element={
                            isAuthenticated ? (
                                <Series filteredMovies={filteredMovies} apiUrl={apiUrl} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/watched"
                        element={
                            isAuthenticated ? (
                                <Watched filteredMovies={filteredMovies} apiUrl={apiUrl} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/movie/:id"
                        element={
                            isAuthenticated ? <MovieDetails apiUrl={apiUrl} /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
