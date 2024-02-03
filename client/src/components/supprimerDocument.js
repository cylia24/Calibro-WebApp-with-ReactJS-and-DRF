import React, { useState } from 'react';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function SupprimerDocument() {
  const [numero, setNumero] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [remarque, setRemarque] = useState('');

  const handleDeleteClick = () => {
    if (numero !== '') {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDelete = () => {
    // Call your Django API to delete the document
    const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };
    fetch(`http://127.0.0.1:8000/api/documents/delete/${numero}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          console.log(`Document with numero ${numero} deleted successfully.`);
          setNumero('');
          setShowConfirmation(false);
          window.location.href = '/documents';
        } else if (response.status === 404) {
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          setShowConfirmation(false);
          console.log(`Document with numero ${numero} not found.`);
        } else {
          console.log('Error deleting document.');
        }
      })
      .catch(error => console.error('Error deleting document:', error));
  };

  const handleCancel = () => {
    window.location.href = `/documents`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/documents">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Supprimer un document</h2>
      <text>Il faut saisir le numéro du document à supprimer.</text>
      <div className="form-group">
      <label>Numéro du Document :</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form'  type="button" onClick={handleCancel}>Annuler</button>
      <button className='button-form'  type="button" onClick={handleDeleteClick}>Supprimer</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <p>Confirmez-vous la suppression du document avec le numéro {numero} ?</p>
            <button onClick={handleConfirmDelete}>Oui</button>
            <button onClick={() => setShowConfirmation(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupprimerDocument;