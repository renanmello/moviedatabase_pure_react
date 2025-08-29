import React, { useState, useEffect } from 'react';
import { getFavorites }  from '../../services/localStorage.js';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleFavoriteUpdate = () => {
    setFavorites(getFavorites());
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h1>Meus Filmes Favoritos</h1>
        <div className="no-favorites">
          <p>Você ainda não tem filmes favoritos.</p>
          <p>Adicione alguns filmes usando o coração ❤️ na página de busca!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Meus Filmes Favoritos ({favorites.length})</h1>
      
      <div className="favorites-grid">
        {favorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showFavoriteButton={true}
            onFavoriteUpdate={handleFavoriteUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;