import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg';
import './../styles/headerbefore.css';

// Cela s'affiche dans la page d'acceuil avant que l'utilisateur se connecte
function HeaderBefore() {
  return (
    <div className="header-container">
      <Link to="/">
          <img src={logo} alt="Logo Electro-Industries Azazga" />
        </Link>
        <nav>
          <a className='inscription-a' href="/sign">S'inscrire</a>
          <a className='connexion-a' href="/login">Se connecter</a>
        </nav>
    </div>
  );
}

export default HeaderBefore;