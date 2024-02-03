import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function ModifierMateriel() {
  const { id_materiel } = useParams();
  const [newReference, setNewReference] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newNumeroInterne, setNewNumeroInterne] = useState('');
  const [newCertificat, setNewCertificat] = useState('');
  const [newDateEmission, setNewDateEmission] = useState('');
  const [newEtat, setNewEtat] = useState('');
  const [newObservation, setNewObservation] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Fetch materiel details
    axios.get(`http://127.0.0.1:8000/api/materiels/detail-id/${id_materiel}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        const materiel = response.data;
        setNewReference(materiel.reference_materiel);
        setNewNumeroInterne(materiel.numero_interne_materiel);
        setNewDesignation(materiel.designation_materiel);
        setNewCertificat(materiel.certificat);
        setNewEtat(materiel.etat_materiel);
        setNewDateEmission(materiel.date_emission);
        setNewObservation(materiel.observation_materiel);
      })
      .catch(error => {
        console.error('Error fetching materiel details:', error);
      });
  }, [id_materiel]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/materiels/update/${id_materiel}/`, {
        reference_materiel: newReference,
        numero_interne_materiel: newNumeroInterne, 
        designation_materiel: newDesignation,
        certificat: newCertificat,
        date_emission: newDateEmission,
        etat_materiel: newEtat,
        observation_materiel: newObservation
    }, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
    .then(response => {
      console.log('Materiel updated:', response.data);
      window.location.href = '/materiels';
    })
    .catch(error => {
      console.error('Error updating materiel:', error);
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
  <h2>Modifier votre matériel</h2>
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
      <label for="newCertificat">Certificat :</label>
      <input
        type="text"
        id="newCertificat"
        value={newCertificat}
        onChange={(e) => setNewCertificat(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newDateEmission">Date d'émission :</label>
      <input
        type="date"
        id="newDateEmission"
        value={newDateEmission}
        onChange={(e) => setNewDateEmission(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label for="newEtat">État du matériel :</label>
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

export default ModifierMateriel;