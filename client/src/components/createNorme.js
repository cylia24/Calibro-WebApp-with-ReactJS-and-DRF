import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function CreateNorme() {
  const [numero, setNumero] = useState('');
  const [designation, setDesignation] = useState('');
  const [observation, setObservation] = useState('');

  const authToken = localStorage.getItem('token');

  const handleCreateNorme = () => {
    axios.post('http://127.0.0.1:8000/api/normes/', {
      numero_norme: numero,
      designation_norme: designation,
      observation_norme: observation
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      }
    })
    .then(response => {
      console.log('Norme created:', response.data);
      window.location.href = '/normes';
    })
    .catch(error => {
      console.error('Error creating norme:', error);
    });
  };


  const handleCancel = () => {
    window.location.href = `/instruments`;
  };

  return (
      <div className='page-container-create'>
      <Link to="/normes">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Créer une Norme</h2>
      <form>
        <div className="form-group">
          <label for="numero">Numéro :</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="designation">Désignation :</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="observation">Observation :</label>
          <input
            type="text"
            id="observation"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className='button-form' type="button" onClick={handleCancel}>Annuler</button>
          <button className='button-form' type="button" onClick={handleCreateNorme}>Créer</button>
        </div>
      </form>
  </div>

  );
}

export default CreateNorme;