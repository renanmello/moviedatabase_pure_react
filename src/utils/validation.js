// Funções para validar a qualidade dos dados dos filmes
export const validateMovie = (movie) => {
  if (!movie) return false;
  
  // Verificar campos obrigatórios
  if (!movie.id || !movie.title) return false;
  
  // Verificar se tem pelo menos uma imagem ou informação relevante
  const hasVisualContent = movie.poster_path || movie.backdrop_path;
  
  // Verificar se tem informações básicas
  const hasBasicInfo = movie.release_date || movie.vote_average > 0 || movie.overview;
  
  // Verificar se não é um filme muito obscuro (menos de 10 votos)
  const hasEnoughVotes = movie.vote_count >= 10;
  
  // Retornar true apenas se tiver conteúdo visual E informações básicas E votos suficientes
  return hasVisualContent && hasBasicInfo && hasEnoughVotes;
};

export const validateMovieForDetails = (movie) => {
  if (!movie) return false;
  
  // Validação mais rigorosa para página de detalhes
  if (!movie.id || !movie.title) return false;
  
  // Deve ter pelo menos poster ou backdrop
  if (!movie.poster_path && !movie.backdrop_path) return false;
  
  // Deve ter pelo menos algumas informações básicas
  const hasMinimumInfo = movie.overview || movie.release_date || movie.genres?.length > 0;
  
  return hasMinimumInfo;
};