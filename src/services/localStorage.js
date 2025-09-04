export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  } catch (error) {
    console.error('Erro ao salvar favoritos:', error);
  }
};

export const addToFavorites = (movie) => {
  const favorites = getFavorites();
  const existing = favorites.find(fav => fav.id === movie.id);
  
  if (!existing) {
    const updatedFavorites = [...favorites, movie];
    saveFavorites(updatedFavorites);
    return updatedFavorites;
  }
  
  return favorites;
};

export const removeFromFavorites = (movieId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
  saveFavorites(updatedFavorites);
  return updatedFavorites;
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some(movie => movie.id === movieId);
};