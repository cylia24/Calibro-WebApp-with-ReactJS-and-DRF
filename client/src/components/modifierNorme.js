import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function ModifierNorme() {
  const { id_norme } = useParams();
  const [newDesignation, setNewDesignation] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newObservation, setNewObservation] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Fetch norme details
    axios.get(`http://127.0.0.1:8000/api/normes/detail-id/${id_norme}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        const norme = response.data;
        setNewNumero(norme.numero_norme);
        setNewDesignation(norme.designation_norme);
        setNewObservation(norme.observation_norme);
      })
      .catch(error => {
        console.error('Error fetching norme details:', error);
      });
  }, [id_norme]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/normes/update/${id_norme}/`, {
        numero_norme: newNumero, 
        designation_norme: newDesignation,
        observation_norme: newObservation
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
    .then(response => {
      console.log('Norme updated:', response.data);
      window.location.href = '/normes';
    })
    .catch(error => {
      console.error('Error updating norme:', error);
    });
  };

  const handleCancel = () => {
    window.location.href = `/instruments`;
  };

  return (
  <div className='page-container-create'>
  <Link to="/normes">
    <img src={logo} alt="Logo Electro-Industries Azazga"/>
  </Link>
  <h2>Modifier votre norme</h2>
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
      <label for="newDesignation">Désignation "ou Nom" :</label>
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

export default ModifierNorme;