import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './../styles/pagesobjets.css';

function Normes() {
  const [normes, setNormes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/normes/?format=json', {
      method: 'GET',
      headers: headers,
      })
      .then(response => response.json())
      .then(data => setNormes(data))
      .catch(error => console.error('Error fetching normes:', error));
  }, []);

  const handleEdit = (id_norme) => {
    window.location.href = `/edit-norme/${id_norme}`;
  };
  
  const handleDeleteConfirmation = (numero) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer la norme avec le N° ${numero} ?`);
    if (confirmDelete) {
      handleDelete(numero);
    }
  };

  const handleDelete = (numero) => {
    fetch(`http://127.0.0.1:8000/api/normes/delete/${numero}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          // Fetch the updated list of normes after deletion
          fetch('http://127.0.0.1:8000/api/normes/?format=json', {
            method: 'GET',
            headers: headers,
            })
            .then(response => response.json())
            .then(data => setNormes(data))
            .catch(error => console.error('Error fetching normes after deletion:', error));
        } else if (response.status === 404) {
          console.log(`Norme with numero ${numero} not found.`);
        } else {
          console.log('Error deleting Norme.');
        }
      })
      .catch(error => console.error('Error deleting Norme:', error));
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
  };


  const filteredNormes = normes.filter(
    (norme) =>
       norme.numero_norme.toLowerCase().includes(searchTerm)
  );
  
  

  return (
    <div className="page-container">
      <Header />
      <h1>Normes</h1>
      <div className="action-links">
      <Link to="/add-norme">Créer une Norme</Link>
      <Link to="/edit-norme">Modifier une Norme</Link>
      <Link to="/delete-norme">Supprimer une Norme</Link>
      </div>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Tapez un N°"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="objet-table">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Numéro</th>
            <th>Observation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNormes.map(norme => (
            <tr key={norme.id_norme}>
              <td>{norme.designation_norme}</td>
              <td>{norme.numero_norme}</td>
              <td>{norme.observation_norme}</td>
              <td>
                <button onClick={() => handleEdit(norme.id_norme)}>Modifier</button>
                <button onClick={() => handleDeleteConfirmation(norme.numero_norme)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Normes;