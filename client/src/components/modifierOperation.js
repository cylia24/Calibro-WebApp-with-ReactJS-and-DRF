import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function ModifierOperation() {
  const { id_operation } = useParams();
  const [newResultat, setNewResultat] = useState('');
  const [newObservation, setNewObservation] = useState('');
  const [newNumeroPv, setNewNumeroPv] = useState('');
  const [id_instrument, setIdInstrument] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Fetch operation details
    axios.get(`http://127.0.0.1:8000/api/operationetalonnages/detail-id/${id_operation}`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        const operation = response.data;
        setNewResultat(operation.resultat_operation);
        setNewObservation(operation.observation_etalonnage);
        setNewNumeroPv(operation.numero_pv);
        setIdInstrument(operation.instrument_operation);
      })
      .catch(error => {
        console.error('Error fetching operation details:', error);
      });
  }, [id_operation]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/operationetalonnages/update/${id_operation}/`, {
      resultat_operation: newResultat,
      observation_etalonnage: newObservation,
      numero_pv: newNumeroPv
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
    .then(response => {
      console.log('Operation updated:', response.data);
      if (newObservation === 'Reforme') {
        axios.put(`http://127.0.0.1:8000/api/instruments/update-state/${id_instrument}/`, {
          etat_instrument: 'Inactif'
        }, {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
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
      console.error('Error updating operation:', error);
    });
  };

  const handleCancel = () => {
    window.location.href = `/etalonner-instrument/${id_instrument}`;
  };

  return (
    <div className='page-container-create'>
      <Link to={`/etalonner-instrument/${id_instrument}`}>
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Modifier votre opération</h2>
      <form>
        <div className="form-group">
        <label>Résultat de l'opération :</label>
          <input
            type="text"
            value={newResultat}
            onChange={(e) => setNewResultat(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label>Observation :</label>
          <select value={newObservation} onChange={(e) => setNewObservation(e.target.value)}>
            <option value="Conforme">Conforme</option>
            <option value="Reforme">Reforme</option>
          </select>
        </div>
        <div className="form-group">
        <label>Numéro du PV :</label>
          <input
            type="text"
            value={newNumeroPv}
            onChange={(e) => setNewNumeroPv(e.target.value)}
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

export default ModifierOperation;
