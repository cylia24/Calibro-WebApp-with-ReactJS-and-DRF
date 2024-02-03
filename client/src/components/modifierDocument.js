import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function ModifierDocument() {
  const { id_document } = useParams();
  const [newDesignation, setNewDesignation] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newObservation, setNewObservation] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/documents/detail-id/${id_document}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        const document = response.data;
        setNewNumero(document.numero_document);
        setNewDesignation(document.designation_document);
        setNewObservation(document.observation_document);
      })
      .catch(error => {
        console.error('Error fetching document details:', error);
      });
  }, [id_document]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/documents/update/${id_document}/`, {
      numero_document: newNumero,
      designation_document: newDesignation,
      observation_document: newObservation,
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        console.log('Document updated:', response.data);
        window.location.href = '/documents';
      })
      .catch(error => {
        console.error('Error updating document:', error);
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
  <h2>Modifier votre document</h2>
  <form>
    <div className="form-group">
      <label for="newNumero">Numéro :</label>
      <input
        type="text"
        id="newNumero"
        value={newNumero}
        onChange={(e) => setNewNumero(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newDesignation">Désignation :</label>
      <input
        type="text"
        id="newDesignation"
        value={newDesignation}
        onChange={(e) => setNewDesignation(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newObservation">Observation :</label>
      <input
        type="text"
        id="newObservation"
        value={newObservation}
        onChange={(e) => setNewObservation(e.target.value)}
      />
    </div>
    <div className="buttons">
      <button className='button-form' type="button" onClick={handleCancel}>Annuler</button>
      <button className='button-form' type="button" onClick={handleUpdate}>Enregistrer</button>
    </div>
    </form>
  </div>

  );
}

export default ModifierDocument;