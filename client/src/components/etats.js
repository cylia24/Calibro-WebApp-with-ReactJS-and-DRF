import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './../styles/pagesobjets.css';

function Etats() {
  return (
    <div className="page-container">
      <Header />
      <h1>États</h1>
      <div className="action-links-etats">
         <Link to="/fiche-vie">Imprimer une fiche de vie</Link>
         <Link to="/planning">Imprimer un planning</Link>
         <Link to="/instruments-inactifs">Instruments Inactifs</Link>
      </div>
      </div>
  );
}

export default Etats;
