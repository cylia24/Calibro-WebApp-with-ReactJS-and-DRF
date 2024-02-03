import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';


function EditDocument() {
  const [numero, setNumero] = useState('');
  // const [documentDetails, setDocumentDetails] = useState(null);
  const [remarque, setRemarque] = useState('');

  const authToken = localStorage.getItem('token');

  const handleEditDocument = () => {
    if (numero) {
      // Document details using the entered numeroInterne
      axios.get(`http://127.0.0.1:8000/api/documents/detail/${numero}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
        .then(response => {
          // Redirect to edit page with document id
          if (response.data.id_document) {
            window.location.href = `/edit-document/${response.data.id_document}`;
          }
        })
        .catch(error => {
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          console.error('Error fetching document details:', error);
        });
    }
  };

  const handleCancel = () => {
    window.location.href = `/documents`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/documents">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Modifier un document</h2>
      <text>Il faut saisir le numéro du document à modifier.</text>
      <div className="form-group">
      <label>
        Numéro du document :</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <span className='Remarque'>{remarque}</span>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleEditDocument}>Modifier</button>
      </div>
    </div>
  );
}

export default EditDocument;