import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          🎬 MovieSearch
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Buscar
          </Link>
          <Link 
            to="/favorites" 
            className={location.pathname === '/favorites' ? 'nav-link active' : 'nav-link'}
          >
            Favoritos
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;