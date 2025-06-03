-- Sekwencja dla movies.movie_id
CREATE SEQUENCE movies_movie_id_seq;
ALTER TABLE movies ALTER COLUMN movie_id SET DEFAULT nextval('movies_movie_id_seq');
ALTER SEQUENCE movies_movie_id_seq OWNED BY movies.movie_id;
SELECT setval('movies_movie_id_seq', (SELECT COALESCE(MAX(movie_id), 1) FROM movies));

-- Sekwencja dla genre.genre_id
CREATE SEQUENCE genre_genre_id_seq;
ALTER TABLE genre ALTER COLUMN genre_id SET DEFAULT nextval('genre_genre_id_seq');
ALTER SEQUENCE genre_genre_id_seq OWNED BY genre.genre_id;
SELECT setval('genre_genre_id_seq', (SELECT COALESCE(MAX(genre_id), 1) FROM genre));

-- Sekwencja dla movielanguage.language_id
CREATE SEQUENCE movielanguage_language_id_seq;
ALTER TABLE movielanguage ALTER COLUMN language_id SET DEFAULT nextval('movielanguage_language_id_seq');
ALTER SEQUENCE movielanguage_language_id_seq OWNED BY movielanguage.language_id;
SELECT setval('movielanguage_language_id_seq', (SELECT COALESCE(MAX(language_id), 1) FROM movielanguage));

-- Sekwencja dla movie_genre.movie_genre_id
CREATE SEQUENCE movie_genre_movie_genre_id_seq;
ALTER TABLE movie_genre ALTER COLUMN movie_genre_id SET DEFAULT nextval('movie_genre_movie_genre_id_seq');
ALTER SEQUENCE movie_genre_movie_genre_id_seq OWNED BY movie_genre.movie_genre_id;
SELECT setval('movie_genre_movie_genre_id_seq', (SELECT COALESCE(MAX(movie_genre_id), 1) FROM movie_genre));

-- Sekwencja dla movie_language.movie_language_id
CREATE SEQUENCE movie_language_movie_language_id_seq;
ALTER TABLE movie_language ALTER COLUMN movie_language_id SET DEFAULT nextval('movie_language_movie_language_id_seq');
ALTER SEQUENCE movie_language_movie_language_id_seq OWNED BY movie_language.movie_language_id;
SELECT setval('movie_language_movie_language_id_seq', (SELECT COALESCE(MAX(movie_language_id), 1) FROM movie_language));

-- Sekwencja dla people.people_id
CREATE SEQUENCE people_people_id_seq;
ALTER TABLE people ALTER COLUMN people_id SET DEFAULT nextval('people_people_id_seq');
ALTER SEQUENCE people_people_id_seq OWNED BY people.people_id;
SELECT setval('people_people_id_seq', (SELECT COALESCE(MAX(people_id), 1) FROM people));

-- Sekwencja dla movie_people.movie_people_id
CREATE SEQUENCE movie_people_movie_people_id_seq;
ALTER TABLE movie_people ALTER COLUMN movie_people_id SET DEFAULT nextval('movie_people_movie_people_id_seq');
ALTER SEQUENCE movie_people_movie_people_id_seq OWNED BY movie_people.movie_people_id;
SELECT setval('movie_people_movie_people_id_seq', (SELECT COALESCE(MAX(movie_people_id), 1) FROM movie_people));

-- Sekwencja dla appuser_movie.user_movie_id
CREATE SEQUENCE appuser_movie_user_movie_id_seq;
ALTER TABLE appuser_movie ALTER COLUMN user_movie_id SET DEFAULT nextval('appuser_movie_user_movie_id_seq');
ALTER SEQUENCE appuser_movie_user_movie_id_seq OWNED BY appuser_movie.user_movie_id;
SELECT setval('appuser_movie_user_movie_id_seq', (SELECT COALESCE(MAX(user_movie_id), 1) FROM appuser_movie));