import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg';
import './../styles/formulaire.css';

function CreateOperation() {
  const { id_instrument } = useParams();
  const [observation, setObservation] = useState('');
  const [numeroPv, setNumeroPv] = useState('');
  const [resultat, setResultat] = useState('');

  const authToken = localStorage.getItem('token');

  const handleCreateOperation = () => {
    axios.post('http://127.0.0.1:8000/api/operationetalonnages/', {
      observation_etalonnage: observation,
      numero_pv: numeroPv,
      resultat_operation: parseFloat(resultat),
      instrument_operation: id_instrument,
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      }
    })
    .then(response => {
      console.log('Operation created:', response.data);
      if (observation === 'Reforme') {
        axios.put(`http://127.0.0.1:8000/api/instruments/update-state/${id_instrument}/`, {
          etat_instrument: 'Inactif'
        }, {
          headers: {
            'Authorization': `Token ${authToken}`,
          }
        })
        .then(instrumentResponse => {
          console.log('Instrument state updated:', instrumentResponse.data);
        })
        .catch(instrumentError => {
          console.error('Error updating instrument state:', instrumentError);
        });
      }
      window.location.href = `/etalonner-instrument/${id_instrument}`;
    })
    .catch(error => {
      console.error('Error creating operation:', error);
    });
  };

  const handleCancel = () => {
    window.location.href = `/etalonner-instrument/${id_instrument}`;
  };

  return (
      <div className='page-container-create'>
      <Link to={`/etalonner-instrument/${id_instrument}`}>
        <img src={logo} alt="Logo Electro-Industries Azazga"/>
      </Link>
      <h2>Créer une nouvelle opération pour votre instrument</h2>
      <form>
        <div class="form-group">
        <label>Observation :</label>
          <select value={observation} onChange={(e) => setObservation(e.target.value)}>
            <option value="">Sélectionnez</option>
            <option value="Conforme">Conforme</option>
            <option value="Reforme">Reforme</option>
          </select>
        </div>
        <div class="form-group">
        <label>N° PV :</label>
          <input
            type="text"
            value={numeroPv}
            onChange={(e) => setNumeroPv(e.target.value)}
          />
        </div>
        <div class="form-group">
        <label>Résultat :</label>
          <input
            type="number" 
            step="0.01"
            value={resultat}
            onChange={(e) => setResultat(e.target.value)}
          />
        </div>
        <div class="buttons">
        <button className='button-form' type="button" onClick={handleCancel}>Annuler</button>
        <button className='button-form' type="button" onClick={handleCreateOperation}>Créer</button>
        </div>
      </form>
    </div>
  );
}

export default CreateOperation;
