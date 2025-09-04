import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../../services/api';
import { isFavorite, addToFavorites, removeFromFavorites } from  '../../services/localStorage.js';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        setIsMovieFavorite(isFavorite(movieData.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average
      });
    }
    setIsMovieFavorite(!isMovieFavorite);
  };

  const getYear = () => {
    if (!movie.release_date) return 'N/A';
    const year = new Date(movie.release_date).getFullYear();
    return isNaN(year) ? 'N/A' : year;
  };

  const getRating = () => {
    if (!movie.vote_average || movie.vote_average === 0) return 'N/A';
    return movie.vote_average.toFixed(1);
  };

  const getRuntime = () => {
    if (!movie.runtime) return 'N/A';
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const posterUrl = movie?.poster_path && !imageError 
    ? getImageUrl(movie.poster_path) 
    : '/placeholder-movie.jpg';

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <div>Filme não encontrado</div>;

  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const mainCast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Voltar
      </button>

      <div className="movie-hero">
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-poster-large"
          onError={() => setImageError(true)}
        />
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          <div className="movie-meta">
            <span>{getYear()}</span>
            <span>•</span>
            <span>{getRuntime()}</span>
            <span>•</span>
            <span>{movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}</span>
          </div>

          <div className="rating">
            ⭐ {getRating()}/10 ({movie.vote_count || 0} votos)
          </div>

          <button
            onClick={handleFavoriteToggle}
            className={`favorite-btn-large ${isMovieFavorite ? 'favorited' : ''}`}
          >
            {isMovieFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
          </button>

          <h3>Sinopse</h3>
          <p className="overview">{movie.overview || 'Sinopse não disponível.'}</p>

          {director && (
            <>
              <h3>Diretor</h3>
              <p>{director.name}</p>
            </>
          )}

          {mainCast.length > 0 && (
            <>
              <h3>Elenco Principal</h3>
              <div className="cast">
                {mainCast.map(actor => (
                  <span key={actor.id} className="actor">
                    {actor.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;