import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './../styles/pagesobjets.css';

function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const [services, setServices] = useState([]);
  

  const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
  const headers = {
    'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
    'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
  };

  useEffect(() => {
    const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };

    // Exemple de requête GET avec les en-têtes
    fetch('http://127.0.0.1:8000/api/instruments/?format=json', {
      method: 'GET',
      headers: headers,
    })
    .then(response => response.json())
    .then(data => setInstruments(data))
    .catch(error => console.error('Error fetching instruments:', error));


    fetch('http://127.0.0.1:8000/api/services/?format=json', {
      method: 'GET',
      headers: headers,
    }) // Fetch services from Django API
    .then(response => response.json())
    .then(data => setServices(data))
    .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleDetails = (numeroInterne) => {
    window.location.href = `/detail-instrument/${numeroInterne}`;
  };

  const handleEdit = (id_instrument) => {
    // Rediriger vers la page de modification avec le numeroInterne
    window.location.href = `/edit-instrument/${id_instrument}`;
  };
  
  const handleDeleteConfirmation = (numeroInterne) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'instrument avec le N°Interne ${numeroInterne} ?`);
    if (confirmDelete) {
      handleDelete(numeroInterne);
    }
  };

  const handleDelete = (numeroInterne) => {
    fetch(`http://127.0.0.1:8000/api/instruments/delete/${numeroInterne}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          // Fetch the updated list of instruments after deletion
          fetch('http://127.0.0.1:8000/api/instruments/?format=json', {
              method: 'GET',
              headers: headers,
            })
            .then(response => response.json())
            .then(data => setInstruments(data))
            .catch(error => console.error('Error fetching instruments after deletion:', error));
        } else if (response.status === 404) {
          console.log(`Instrument with numero interne ${numeroInterne} not found.`);
        } else {
          console.log('Error deleting instrument.');
        }
      })
      .catch(error => console.error('Error deleting instrument:', error));
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
  };

  const handleServiceChange = (event) => {
    const selectedValue = event.target.value;
    console.log('Selected value:', selectedValue);
    setSelectedService(selectedValue);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  
  const filteredInstruments = instruments.filter(
    (instrument) =>
      instrument.numero_interne_instrument.toLowerCase().includes(searchTerm) &&
      (!selectedService || instrument.service_instrument === parseInt(selectedService)) &&
      (selectedMonth === '' || instrument.mois_etalonnage === selectedMonth)
  );

  function getNumeroService(serviceInstrument) {
    const matchingService = services.find(service => service.id_service === serviceInstrument);
    return matchingService ? matchingService.numero_service : '';
  }
  
  

  return (
    <div className="page-container">
      <Header />
      <h1>Instruments</h1>
      <div className="action-links">
         <Link to="/add-instrument">Créer un Instrument</Link>
         <Link to="/edit-instrument">Modifier un Instrument</Link>
         <Link to="/delete-instrument">Supprimer un Instrument</Link>
      </div>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Tapez un N°Interne"
          value={searchTerm}
          onChange={handleSearch}
        />
        <label>Service:</label>
        <select value={selectedService} onChange={handleServiceChange}>
          <option value="">Tous</option>
          {services.map(service => (
            <option key={service.id_service} value={service.id_service}>
              {service.numero_service}
            </option>
          ))}
        </select>
        <label>Mois d'étalonnage:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Tous</option>
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <table className="objet-table">
        <thead>
          <tr>
            <th>N° d'Identification</th>
            <th>N° Interne</th>
            <th>Désignation</th>
            <th>N° Service</th>
            <th>Mois d'étalonnage</th>
            <th>Type</th>
            <th>Fréquence de contrôle</th>
            <th>Critère d'acceptation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstruments.map(instrument => (
            <tr key={instrument.id_instrument}>
              <td>{instrument.reference_instrument}</td>
              <td>{instrument.numero_interne_instrument}</td>
              <td>{instrument.designation_instrument}</td>
              <td>{getNumeroService(instrument.service_instrument)}</td>
              <td>{instrument.mois_etalonnage}</td>
              <td>{instrument.type_instrument}</td>
              <td>{instrument.frequence_controle}</td>
              <td>{instrument.critere_acceptation}</td>
              <td>
                <button onClick={() => handleDetails(instrument.numero_interne_instrument)}>Détails</button>
                <button onClick={() => handleEdit(instrument.id_instrument)}>Modifier</button>
                <button onClick={() => handleDeleteConfirmation(instrument.numero_interne_instrument)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Instruments;



