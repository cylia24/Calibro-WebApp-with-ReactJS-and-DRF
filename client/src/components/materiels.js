import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './../styles/pagesobjets.css';

function Materiels() {
  const [materiels, setMateriels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/materiels/?format=json', {
      method: 'GET',
      headers: headers,
      })
      .then(response => response.json())
      .then(data => setMateriels(data))
      .catch(error => console.error('Error fetching materiels:', error));
  }, []);

  const handleEdit = (id_materiel) => {
    window.location.href = `/edit-materiel/${id_materiel}`;
  };
  
  const handleDeleteConfirmation = (numeroInterne) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer le matériel avec le N°Interne ${numeroInterne} ?`);
    if (confirmDelete) {
      handleDelete(numeroInterne);
    }
  };

  const handleDelete = (numeroInterne) => {
    fetch(`http://127.0.0.1:8000/api/materiels/delete/${numeroInterne}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          // Fetch the updated list of materiels after deletion
          fetch('http://127.0.0.1:8000/api/materiels/?format=json', {
            method: 'GET',
            headers: headers,
            })
            .then(response => response.json())
            .then(data => setMateriels(data))
            .catch(error => console.error('Error fetching materiels after deletion:', error));
        } else if (response.status === 404) {
          console.log(`Materiel with numero interne ${numeroInterne} not found.`);
        } else {
          console.log('Error deleting Materiel.');
        }
      })
      .catch(error => console.error('Error deleting Materiel:', error));
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
  };


  const filteredMateriels = materiels.filter(
    (materiel) =>
       materiel.numero_interne_materiel.toLowerCase().includes(searchTerm)
  );
  
  

  return (
    <div className="page-container">
      <Header />
      <h1>Matériels</h1>
      <div className="action-links">
      <Link to="/add-materiel">Créer un Matériel</Link>
      <Link to="/edit-materiel">Modifier un Matériel</Link>
      <Link to="/delete-materiel">Supprimer un Matériel</Link>
      </div>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Tapez un N°Interne"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="objet-table">
        <thead>
          <tr>
            <th>N° d'Identification</th>
            <th>Désignation</th>
            <th>N° Interne</th>
            <th>Certificat</th>
            <th>Date d'émission</th>
            <th>État du Matériel</th>
            <th>Observation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMateriels.map(materiel => (
            <tr key={materiel.id_materiel}>
              <td>{materiel.reference_materiel}</td>
              <td>{materiel.designation_materiel}</td>
              <td>{materiel.numero_interne_materiel}</td>
              <td>{materiel.certificat}</td>
              <td>{materiel.date_emission}</td>
              <td>{materiel.etat_materiel}</td>
              <td>{materiel.observation_materiel}</td>
              <td>
                <button onClick={() => handleEdit(materiel.id_materiel)}>Modifier</button>
                <button onClick={() => handleDeleteConfirmation(materiel.numero_interne_materiel)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Materiels;