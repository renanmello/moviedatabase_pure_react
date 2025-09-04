import React, { useState } from 'react';
import { searchMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { validateMovie } from '../../utils/validation';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(searchTerm, page);
      
      // Filtrar filmes com validação rigorosa
      const filteredMovies = data.results.filter(validateMovie);
      
      setMovies(filteredMovies);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  const handlePageChange = (page) => {
    handleSearch(page);
    window.scrollTo(0, 0);
  };

  const handleFavoriteUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="search-container" key={refreshKey}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do filme..."
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={!searchTerm.trim()}>
          🔍 Buscar
        </button>
      </form>

      {loading && <Loading />}

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => handleSearch(currentPage)} 
        />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <p className="results-count">
            Mostrando {movies.length} filme{movies.length !== 1 ? 's' : ''} de qualidade
          </p>
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onFavoriteUpdate={handleFavoriteUpdate}
              />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!loading && !error && movies.length === 0 && searchTerm && (
        <div className="no-results">
          <p>Nenhum filme com informações completas encontrado para "{searchTerm}"</p>
          <p className="no-results-tip">
            💡 Tente buscar por filmes mais conhecidos ou populares
          </p>
        </div>
      )}

      {!loading && !error && !searchTerm && (
        <div className="welcome-message">
          <h2>Bem-vindo ao MovieSearch!</h2>
          <p>Digite o nome de um filme na barra de busca para começar.</p>
          <p className="welcome-tip">
            Mostramos apenas filmes com informações completas para melhor experiência
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;