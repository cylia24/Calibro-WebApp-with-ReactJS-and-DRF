import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function ModifierInstrument() {
  const { id_instrument } = useParams();
  const [newReference, setNewReference] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newNumeroInterne, setNewNumeroInterne] = useState('');
  const [newType, setNewType] = useState('');
  const [newService, setNewService] = useState('');
  const [newMoisEtalonnage, setNewMoisEtalonnage] = useState('');
  const [newCritereAcceptation, setNewCritereAcceptation] = useState('');
  const [newFrequenceControle, setNewFrequenceControle] = useState('');
  const [newObservation, setNewObservation] = useState('');
  const [newEtat, setNewEtat] = useState('');

  const [typeOptions, setTypeOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const moisOptions = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Fetch instrument details
    axios.get(`http://127.0.0.1:8000/api/instruments/detail-id/${id_instrument}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        const instrument = response.data;
        setNewReference(instrument.reference_instrument);
        setNewNumeroInterne(instrument.numero_interne_instrument);
        setNewDesignation(instrument.designation_instrument);
        setNewCritereAcceptation(instrument.critere_acceptation);
        setNewFrequenceControle(instrument.frequence_controle);
        setNewMoisEtalonnage(instrument.mois_etalonnage);
        setNewService(instrument.service_instrument);
        setNewType(instrument.type_instrument);
        setNewObservation(instrument.observation_instrument);
        setNewEtat(instrument.etat_instrument);
      })
      .catch(error => {
        console.error('Error fetching instrument details:', error);
      });

    // Fetch type options from API
    axios.get('http://127.0.0.1:8000/api/types/', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        setTypeOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching type options:', error);
      });

    // Fetch service options from API
    axios.get('http://127.0.0.1:8000/api/services/', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        setServiceOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching service options:', error);
      });
  }, [id_instrument]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/instruments/update/${id_instrument}/`, {
        reference_instrument: newReference,
        numero_interne_instrument: newNumeroInterne, 
        designation_instrument: newDesignation,
        type_instrument: newType,
        service_instrument: newService,
        mois_etalonnage: newMoisEtalonnage,
        critere_acceptation: newCritereAcceptation,
        frequence_controle: newFrequenceControle,
        observation_instrument: newObservation,
        etat_instrument: newEtat
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
    .then(response => {
      console.log('Instrument updated:', response.data);
      window.location.href = '/instruments';
    })
    .catch(error => {
      console.error('Error updating instrument:', error);
    });
  };


  const handleCancel = () => {
    window.location.href = `/instruments`;
  };

  return (
    <div className='page-container-create'>
    <Link to="/instruments">
      <img src={logo} alt="Logo Electro-Industries Azazga" />
    </Link>
  <h2>Modifier votre instrument</h2>
  <form>
    <div className="form-group">
      <label for="newReference">Référence :</label>
      <input
        type="text"
        id="newReference"
        value={newReference}
        onChange={(e) => setNewReference(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newNumeroInterne">Numéro Interne :</label>
      <input
        type="text"
        id="newNumeroInterne"
        value={newNumeroInterne}
        onChange={(e) => setNewNumeroInterne(e.target.value)}
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
      <label for="newCritereAcceptation">Critère d'Acceptation :</label>
      <input
        type="text"
        id="newCritereAcceptation"
        value={newCritereAcceptation}
        onChange={(e) => setNewCritereAcceptation(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newFrequenceControle">Fréquence de Contrôle :</label>
      <input
        type="text"
        id="newFrequenceControle"
        value={newFrequenceControle}
        onChange={(e) => setNewFrequenceControle(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newType">Type :</label>
      <select
        id="newType"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      >
        <option value="">Sélectionnez un type</option>
        {typeOptions.map(option => (
          <option key={option.id_type} value={option.id_type}>
            {option.designation_type}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label for="newService">Service :</label>
      <select
        id="newService"
        value={newService}
        onChange={(e) => setNewService(e.target.value)}
      >
        <option value="">Sélectionnez un service</option>
        {serviceOptions.map(option => (
          <option key={option.id_service} value={option.id_service}>
            {option.designation_service}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label for="newMoisEtalonnage">Mois d'Étalonnage :</label>
      <select
        id="newMoisEtalonnage"
        value={newMoisEtalonnage}
        onChange={(e) => setNewMoisEtalonnage(e.target.value)}
      >
        <option value="">Sélectionnez un mois</option>
        {moisOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label for="newEtat">État de l'instrument :</label>
      <select
        id="newEtat"
        value={newEtat}
        onChange={(e) => setNewEtat(e.target.value)}
      >
        <option value="Actif">Actif</option>
        <option value="Inactif">Inactif</option>
      </select>
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

export default ModifierInstrument;
