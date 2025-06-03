import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function Home({ apiUrl }) {
    const [loading, setLoading] = useState(true);
    const [topRecommendations, setTopRecommendations] = useState([]);
    const [movieRecommendations, setMovieRecommendations] = useState([]);
    const [seriesRecommendations, setSeriesRecommendations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token'); // Zakładamy, że token jest przechowywany w localStorage
        if (!token) {
            setError("Zaloguj się, aby zobaczyć rekomendacje.");
            setLoading(false);
            return;
        }

        const fetchRecommendations = async () => {
            try {
                // Pobierz ogólne rekomendacje (filmy i seriale razem)
                const topResponse = await axios.get(`${apiUrl}/recommendations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTopRecommendations(topResponse.data.recommendations);

                // Pobierz rekomendacje tylko dla filmów
                const movieResponse = await axios.get(`${apiUrl}/recommendations?type=movie`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovieRecommendations(movieResponse.data.recommendations);

                // Pobierz rekomendacje tylko dla seriali
                const seriesResponse = await axios.get(`${apiUrl}/recommendations?type=series`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSeriesRecommendations(seriesResponse.data.recommendations);

                setLoading(false);
            } catch (err) {
                console.error("Błąd podczas pobierania rekomendacji:", err);
                setError("Nie udało się pobrać rekomendacji. Spróbuj ponownie później.");
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [apiUrl]);

    if (loading) return <p style={{ color: '#f5c518', textAlign: 'center' }}>Ładowanie...</p>;

    if (error) return <p style={{ color: '#f5c518', textAlign: 'center' }}>{error}</p>;

    return (
        <div className="movie-slider">
            {/* Swiper z najlepszymi rekomendacjami (filmy i seriale razem) */}
            <h2 className="category-title">Najlepsze rekomendacje dla Ciebie</h2>
            {topRecommendations.length > 0 ? (
                <Swiper
                    loop={true}
                    autoHeight={true}
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 20 },
                        480: { slidesPerView: 3, spaceBetween: 30 },
                        640: { slidesPerView: 4, spaceBetween: 40 },
                    }}
                    centeredSlides={true}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 0,
                        slideShadows: false,
                        depth: 300,
                        stretch: 0,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    className="coverflowSwiper"
                >
                    {topRecommendations.map((movie) => (
                        <SwiperSlide key={`top-${movie.movie_id}`}>
                            <div className="carousel-item">
                                <Link to={`/movie/${movie.movie_id}`} className="carousel-item">
                                    <img
                                        src={movie.poster || 'https://placehold.co/200x300'}
                                        alt={movie.title || 'Brak tytułu'}
                                        className="carousel-poster"
                                    />
                                    <h3 className="carousel-title">{movie.title || 'Brak tytułu'}</h3>
                                    <p className="carousel-meta">{movie.prod_year || 'Brak roku'}</p>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p style={{ color: '#f5c518', textAlign: 'center' }}>
                    Brak rekomendacji. Obejrzyj więcej filmów lub seriali!
                </p>
            )}

            {/* Swiper z rekomendacjami filmów */}
            <div className="categories-slider">
                <div className="category-section">
                    <h2 className="category-title">Polecane filmy</h2>
                    {movieRecommendations.length > 0 ? (
                        <Swiper
                            loop={true}
                            spaceBetween={15}
                            slidesPerView={8}
                            modules={[Navigation]}
                            navigation
                        >
                            {movieRecommendations.map((movie) => (
                                <SwiperSlide key={`movie-${movie.movie_id}`}>
                                    <Link to={`/movie/${movie.movie_id}`} className="movie-card">
                                        <img
                                            src={movie.poster || 'https://placehold.co/200x300'}
                                            alt={movie.title || 'Brak tytułu'}
                                            className="movie-poster"
                                        />
                                        <h3 className="movieTitle">{movie.title || 'Brak tytułu'}</h3>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p style={{ color: '#f5c518', textAlign: 'center' }}>
                            Brak polecanych filmów.
                        </p>
                    )}
                </div>
            </div>

            {/* Swiper z rekomendacjami seriali */}
            <div className="categories-slider">
                <div className="category-section">
                    <h2 className="category-title">Polecane seriale</h2>
                    {seriesRecommendations.length > 0 ? (
                        <Swiper
                            loop={true}
                            spaceBetween={15}
                            slidesPerView={8}
                            modules={[Navigation]}
                            navigation
                        >
                            {seriesRecommendations.map((movie) => (
                                <SwiperSlide key={`series-${movie.movie_id}`}>
                                    <Link to={`/movie/${movie.movie_id}`} className="movie-card">
                                        <img
                                            src={movie.poster || 'https://placehold.co/200x300'}
                                            alt={movie.title || 'Brak tytułu'}
                                            className="movie-poster"
                                        />
                                        <h3 className="movieTitle">{movie.title || 'Brak tytułu'}</h3>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p style={{ color: '#f5c518', textAlign: 'center' }}>
                            Brak polecanych seriali.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;