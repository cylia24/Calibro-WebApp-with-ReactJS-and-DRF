import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';
import HeaderBefore from './headerbefore';
import logo from './images/logo.svg';
import './../styles/home.css';
import calibration from './images/calibration.png'; // Remplacez par le chemin de votre image


// Le contenu de la page d'acceuil avant connexion
function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${calibration})`,
  };


  return (
    <div className="home-container">
      <HeaderBefore />
      <div className="background-image" style={backgroundStyle}></div>
      <div className="main-content">
        <p>
          Bienvenue sur Calibro, l'application web qui vous aide à atteindre vos objectifs de calibration.
        </p>
       <Link to="/about" className="learn-more-btn">En savoir plus</Link>
      </div>
    </div>
  );
}

export default Home;