import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg'; 
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';


function CreateMateriel() {
  const [reference, setReference] = useState('');
  const [numeroInterne, setNumeroInterne] = useState('');
  const [designation, setDesignation] = useState('');
  const [certificat, setCertificat] = useState('');
  const [dateEmission, setDateEmission] = useState('');
  const [etat, setEtat] = useState('Actif');
  const [observation, setObservation] = useState('');

  const authToken = localStorage.getItem('token');

  const handleCreateMateriel = () => {
    axios.post('http://127.0.0.1:8000/api/materiels/', {
      reference_materiel: reference,
      numero_interne_materiel: numeroInterne,
      designation_materiel: designation,
      observation_materiel: observation,
      certificat: certificat,
      date_emission: dateEmission,
      etat_materiel: etat
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      }
    })
    .then(response => {
      console.log('Materiel created:', response.data);
      window.location.href = '/materiels';
    })
    .catch(error => {
      console.error('Error creating materiel:', error);
    });
  };


  const handleCancel = () => {
    window.location.href = `/materiels`;
  };

  return (
    <div className='page-container-create'>
    <Link to="/materiels">
      <img src={logo} alt="Logo Electro-Industries Azazga" />
    </Link>
    <h2>Créer votre matériel</h2>
    <form>
      <div className="form-group">
        <label for="reference">Référence :</label>
        <input
          type="text"
          id="reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="numeroInterne">Numéro Interne :</label>
        <input
          type="text"
          id="numeroInterne"
          value={numeroInterne}
          onChange={(e) => setNumeroInterne(e.target.value)}
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
        <label for="etat">État du Matériel :</label>
        <select
          id="etat"
          value={etat}
          onChange={(e) => setEtat(e.target.value)}
        >
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
        </select>
      </div>
      <div className="form-group">
        <label for="certificat">Certificat :</label>
        <input
          type="text"
          id="certificat"
          value={certificat}
          onChange={(e) => setCertificat(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="dateEmission">Date d'émission :</label>
        <input
          type="date"
          id="dateEmission"
          value={dateEmission}
          onChange={(e) => setDateEmission(e.target.value)}
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
        <button className='button-form' type="button" onClick={handleCreateMateriel}>Créer</button>
      </div>
    </form>
  </div>
  );
}

export default CreateMateriel;
