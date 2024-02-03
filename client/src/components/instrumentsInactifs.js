import React, { useState, useEffect } from 'react';
import Header from './header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './../styles/pagesobjets.css';
import { Link } from 'react-router-dom';

function InstrumentsInactifs() {
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
      })
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);
  
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

  const handleImprimerInstrumentsInactifs = (instruments) => {
    // Créez un nouvel objet jsPDF
    const doc = new jsPDF();
  
    // Titre du document
    doc.text('Liste des Instruments Inactifs', 10, 10);
  
    // Tableau pour afficher les instruments
    const instrumentsData = instruments.map((instrument, index) => [
      index + 1,
      instrument.reference_instrument,
      instrument.designation_instrument,
      instrument.numero_interne_instrument,
      instrument.service_instrument,
      instrument.mois_etalonnage,
      instrument.type_instrument,
    ]);
  
    // Définir les en-têtes de colonne
    const headers = [
      ['#', 'Référence', 'Désignation', 'N°Interne', 'Service', 'Mois', 'Type'],
    ];
  
    // Marge supérieure pour commencer la table
    let startY = 20;
  
    // Générez la table en utilisant autoTable de jsPDF
    doc.autoTable({
      head: headers,
      body: instrumentsData,
      startY: startY + 10,
      theme: 'grid',
    });

    //Enregistrement du PDF avec comme nom "liste_instruments_inactifs"
    doc.save('liste_instruments_inactifs.pdf');
  };
  

  // Filtrer les instruments inactifs
  const instrumentsInactifs = instruments.filter(instrument => instrument.etat_instrument === 'Inactif');


  const filteredInstruments = instrumentsInactifs.filter(
    (instrument) =>
      instrument.numero_interne_instrument.toLowerCase().includes(searchTerm) &&
      (!selectedService || instrument.service_instrument === parseInt(selectedService)) &&
      (selectedMonth === '' || instrument.mois_etalonnage === selectedMonth)
  );
  
  

  return (
    <div className="page-container">
      <Header />
      <h1>Instruments Inactifs</h1>
      <div className="action-links">
        <Link to="/instruments-inactifs" onClick={() => handleImprimerInstrumentsInactifs(filteredInstruments)}>Imprimer</Link>
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
              {service.designation_service}
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
            <th>Référence</th>
            <th>Désignation</th>
            <th>N°Interne</th>
            <th>Service</th>
            <th>Mois</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstruments.map(instrument => (
            <tr key={instrument.id_instrument}>
              <td>{instrument.reference_instrument}</td>
              <td>{instrument.designation_instrument}</td>
              <td>{instrument.numero_interne_instrument}</td>
              <td>{instrument.service_instrument}</td>
              <td>{instrument.mois_etalonnage}</td>
              <td>{instrument.type_instrument}</td>
              <td>
                <button onClick={() => handleDeleteConfirmation(instrument.numero_interne_instrument)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstrumentsInactifs;

