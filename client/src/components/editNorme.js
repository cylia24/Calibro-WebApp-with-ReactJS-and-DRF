import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function EditNorme() {
  const [numero, setNumero] = useState('');
  // const [normeDetails, setNormeDetails] = useState(null);
  const [remarque, setRemarque] = useState('');

  const authToken = localStorage.getItem('token');

  const handleEditNorme = () => {
    if (numero) {
      // Norme details using the entered numeroInterne
      axios.get(`http://127.0.0.1:8000/api/normes/detail/${numero}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
        .then(response => {
          // Redirect to edit page with norme id
          if (response.data.id_norme) {
            window.location.href = `/edit-norme/${response.data.id_norme}`;
          }
        })
        .catch(error => {
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          console.error('Error fetching norme details:', error);
        });
    }
  };

  const handleCancel = () => {
    window.location.href = `/normes`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/normes">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Modifier une norme</h2>
      <text>Il faut saisir le numéro de la norme à modifier.</text>
      <div className="form-group">
      <label>
        Numéro de la norme :</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleEditNorme}>Modifier</button>
      </div>
    </div>
  );
}

export default EditNorme;