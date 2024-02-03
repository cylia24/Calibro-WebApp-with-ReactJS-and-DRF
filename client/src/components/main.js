import React from 'react';
import Header from './header';
import Instruments from './instruments'; // Importez le composant Instruments
import { Routes, Route } from 'react-router-dom';

function Main() {
  return (
    <div className="main">
      <Routes>
        {/* Affichez la liste des instruments par défaut */}
        <Route path="/" element={<Instruments />} />
        {/* Ajoutez d'autres routes pour les autres sections (normes, documents, etc.) */}
      </Routes>
    </div>
  );
}

export default Main;