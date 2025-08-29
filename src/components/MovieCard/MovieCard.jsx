import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import { isFavorite, addToFavorites, removeFromFavorites } from '../../services/localStorage.js';
import './MovieCard.css';


const MovieCard = ({ movie, showFavoriteButton = true, onFavoriteUpdate }) => {
  const [imageError, setImageError] = useState(false);
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    
    if (onFavoriteUpdate) {
      onFavoriteUpdate();
    }
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

  const imageUrl = movie.poster_path && !imageError 
    ? getImageUrl(movie.poster_path) 
    : '/placeholder-movie.jpg';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-poster"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">Ano: {getYear()}</p>
          <p className="movie-rating">
            ⭐ {getRating()}
          </p>
        </div>
      </Link>
      
      {showFavoriteButton && (
        <button
          onClick={handleFavoriteClick}
          className={`favorite-btn ${isMovieFavorite ? 'favorited' : ''}`}
          aria-label={isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isMovieFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
};

export default MovieCard;