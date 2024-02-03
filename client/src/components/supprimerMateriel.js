import React, { useState } from 'react';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function SupprimerMateriel() {
  const [numeroInterne, setNumeroInterne] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [remarque, setRemarque] = useState('');

  const handleDeleteClick = () => {
    if (numeroInterne !== '') {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDelete = () => {
    // Call your Django API to delete the materiel
    const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };
    fetch(`http://127.0.0.1:8000/api/materiels/delete/${numeroInterne}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          console.log(`Materiel with numero interne ${numeroInterne} deleted successfully.`);
          setNumeroInterne('');
          setShowConfirmation(false);
          window.location.href = '/materiels';
        } else if (response.status === 404) {
          setShowConfirmation(false);
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          console.log(`Materiel with numero interne ${numeroInterne} not found.`);
        } else {
          console.log('Error deleting materiel.');
        }
      })
      .catch(error => console.error('Error deleting materiel:', error));
  };
  
  const handleCancel = () => {
    window.location.href = `/materiels`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/materiels">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Supprimer un matériel</h2>
      <text>Il faut saisir le numéro interne du matériel à supprimer.</text>
      <div className="form-group">
      <label>Numéro Interne du matériel :</label>  
        <input
          type="text"
          value={numeroInterne}
          onChange={(e) => setNumeroInterne(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form' type="button" onClick={handleCancel}>Annuler</button>
      <button className='button-form' type="button" onClick={handleDeleteClick}>Supprimer</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>Confirmez-vous la suppression du matériel avec le numéro interne {numeroInterne} ?</p>
            <button onClick={handleConfirmDelete}>Oui</button>
            <button onClick={() => setShowConfirmation(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupprimerMateriel;
