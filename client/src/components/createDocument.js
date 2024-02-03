import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function CreateDocument() {
  const [numero, setNumero] = useState('');
  const [designation, setDesignation] = useState('');
  const [observation, setObservation] = useState('');
  const authToken = localStorage.getItem('token');

  const handleCreateDocument = () => {
    axios.post('http://127.0.0.1:8000/api/documents/', {
      numero_document: numero,
      designation_document: designation,
      observation_document: observation
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      }
    })
    .then(response => {
      console.log('Document created:', response.data);
      window.location.href = '/documents';
    })
    .catch(error => {
      console.error('Error creating document:', error);
    });
  };


  const handleCancel = () => {
    window.location.href = `/documents`;
  };

  return (
  <div className='page-container-create'>
  <Link to="/documents">
    <img src={logo} alt="Logo Electro-Industries Azazga" />
  </Link>
  <h2>Créer un document</h2>
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
      <button className='button-form' type="button" onClick={handleCreateDocument}>Créer</button>
    </div>
    </form>
  </div>

  );
}

export default CreateDocument;