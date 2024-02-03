import React from 'react';
import Footer from './footer';
import HeaderBefore from './headerbefore';
import './../styles/about.css';
import { Link } from 'react-router-dom'


function About() {
  return (
    <div className="about" > 
      <HeaderBefore />
      <div className="about-container">
      <div className="section">
        <h2>Notre Entreprise</h2>
        <p>
          Découvrez tout sur notre entreprise et notre mission dans le domaine de la calibration.
        </p>
      </div>

      <div className="section">
        <h2>Nos Services</h2>
        <p>
          Explorez les services que nous offrons pour vous aider à atteindre vos objectifs de calibration.
        </p>
      </div>

      <div className="section">
        <h2>Fonctionnalités</h2>
        <p>
          Découvrez les fonctionnalités uniques de Calibro qui le distinguent des autres applications.
        </p>
      </div>

      <div className="section">
        <h2>Développement</h2>
        <p>
          Plongez dans le processus de développement de Calibro et les technologies utilisées.
        </p>
      </div>

      <div className="section">
        <h2>À Propos de Moi</h2>
        <p>
          En savoir plus sur la personne derrière Calibro et son engagement envers l'innovation.
        </p>
      </div>

      <Link to="/" className="back-home-btn">Retour à la Page d'Accueil</Link>
    </div>
    <Footer />
    </div>
  );
}

export default About;
