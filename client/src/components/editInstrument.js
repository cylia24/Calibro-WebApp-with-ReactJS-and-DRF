import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function EditInstrument() {
  const [numeroInterne, setNumeroInterne] = useState('');
  //const [instrumentDetails, setInstrumentDetails] = useState(null);
  const [remarque, setRemarque] = useState('');

  const authToken = localStorage.getItem('token');

  const handleEditInstrument = () => {
    if (numeroInterne) {
      // Instrument details using the entered numeroInterne
      axios.get(`http://127.0.0.1:8000/api/instruments/detail/${numeroInterne}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
        .then(response => {
          // Redirect to edit page with instrument id
          if (response.data.id_instrument) {
            window.location.href = `/edit-instrument/${response.data.id_instrument}`;
          }
        })
        .catch(error => {
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          console.error('Error fetching instrument details:', error);
        });
    }
  };

  const handleCancel = () => {
    window.location.href = `/instruments`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/instruments">
        <img src={logo} alt="Logo Electro-Industries Azazga"/>
      </Link>
      <h2>Modifier un instrument</h2>
      <text>Il faut saisir le numéro interne de l'instrument à modifier.</text>
      <div className="form-group">
      <label>
        Numéro Interne de l'Instrument :</label>
        <input
          type="text"
          value={numeroInterne}
          onChange={(e) => setNumeroInterne(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleEditInstrument}>Modifier</button>
      </div>
    </div>
  );
}

export default EditInstrument;

