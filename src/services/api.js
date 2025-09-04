import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR'
  }
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar filmes');
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: { append_to_response: 'credits' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar detalhes do filme');
  }
};

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : '/placeholder-movie.jpg';
};


export default api;