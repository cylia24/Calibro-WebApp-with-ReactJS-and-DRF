import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function CreateInstrument() {
  const [reference, setReference] = useState('');
  const [numeroInterne, setNumeroInterne] = useState('');
  const [designation, setDesignation] = useState('');
  const [frequence, setFrequence] = useState('');
  const [critere, setCritere] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedMois, setSelectedMois] = useState('');
  const [etat, setEtat] = useState('Actif');
  const [observation, setObservation] = useState('');
  const [remarque, setRemarque] = useState('');

  const moisOptions = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const authToken = localStorage.getItem('token');

  useEffect(() => {
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
        setRemarque("Attention : Vous devez saisir un numéro unique.");
        console.error('Error fetching service options:', error);
      });
  }, []);

  const handleCreateInstrument = () => {
    axios.post('http://127.0.0.1:8000/api/instruments/', {
    reference_instrument: reference,
    numero_interne_instrument: numeroInterne,
    designation_instrument: designation,
    frequence_controle: frequence,
    critere_acceptation: critere,
    type_instrument: selectedType,
    service_instrument: selectedService,
    mois_etalonnage: selectedMois,
    observation_instrument: observation,
    etat_instrument: etat,
  }, {
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
    .then(response => {
      console.log('Instrument created:', response.data);
      window.location.href = '/instruments';
    })
    .catch(error => {
      setRemarque("Attention : Le numéro que vous avez saisi doit etre unique.");
      console.error('Error creating instrument:', error);

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
    <h2>Créer un instrument</h2>
    <span className='Remarque'>{remarque}</span>
    <form>
      <div class="form-group">
        <label for="reference">Référence :</label>
        <input
          type="text"
          id="reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="numeroInterne">Numéro Interne :</label>
        <input
          type="text"
          id="numeroInterne"
          value={numeroInterne}
          onChange={(e) => setNumeroInterne(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="designation">Désignation :</label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="frequence">Fréquence de Contrôle :</label>
        <input
          type="text"
          id="frequence"
          value={frequence}
          onChange={(e) => setFrequence(e.target.value)}
        />
        </div>
        <div class="form-group">
        <label for="critere">Critère d'Acceptation :</label>
        <input
          type="text"
          id="critere"
          value={critere}
          onChange={(e) => setCritere(e.target.value)}
        />
        </div>
      <div class="form-group">
        <label for="selectedType">Type :</label>
        <select
          id="selectedType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Sélectionnez un type</option>
          {typeOptions.map(option => (
            <option key={option.id_type} value={option.id_type}>
              {option.designation_type}
            </option>
          ))}
        </select>
        </div>
        <div class="form-group">
        <label for="selectedService">Service :</label>
        <select
          id="selectedService"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Sélectionnez un service</option>
          {serviceOptions.map(option => (
            <option key={option.id_service} value={option.id_service}>
              {option.designation_service}
            </option>
          ))}
        </select>
        </div>
        <div class="form-group">
        <label for="selectedMois">Mois :</label>
        <select
          id="selectedMois"
          value={selectedMois}
          onChange={(e) => setSelectedMois(e.target.value)}
        >
          <option value="">Sélectionnez un mois</option>
          {moisOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        </div>
        <div class="form-group">
        <label for="etat">État :</label>
        <select
          id="etat"
          value={etat}
          onChange={(e) => setEtat(e.target.value)}
        >
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
        </select>
      </div>
      <div class="form-group">
        <label for="observation">Observation :</label>
        <input
          type="text"
          id="observation"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </div>
      <div class="buttons">
        <button className='button-form' type="button" onClick={handleCancel}>Annuler</button>
        <button className='button-form'  type="button" onClick={handleCreateInstrument}>Créer</button>
      </div>
    </form>
  </div>

  );
}

export default CreateInstrument;
