import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import './../styles/pagesobjets.css';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
   
  const authToken = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    const headers = {
      'Authorization': `Token ${authToken}`, // Inclure le token dans l'en-tête
      'Content-Type': 'application/json', // Spécifier le type de contenu si nécessaire
    };

  useEffect(() => {
    
    fetch('http://127.0.0.1:8000/api/documents/?format=json', {
      method: 'GET',
      headers: headers,
      })
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  const handleEdit = (id_document) => {
    window.location.href = `/edit-document/${id_document}`;
  };
  
  const handleDeleteConfirmation = (numero) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer le document avec le N° ${numero} ?`);
    if (confirmDelete) {
      handleDelete(numero);
    }
  };

  const handleDelete = (numero) => {
    fetch(`http://127.0.0.1:8000/api/documents/delete/${numero}/`, {
      method: 'DELETE',
      headers: headers,
    })
      .then(response => {
        if (response.status === 204) {
          // Fetch the updated list of documents after deletion
          fetch('http://127.0.0.1:8000/api/documents/?format=json', {
            method: 'GET',
            headers: headers,
            })
            .then(response => response.json())
            .then(data => setDocuments(data))
            .catch(error => console.error('Error fetching documents after deletion:', error));
        } else if (response.status === 404) {
          console.log(`Document with numero ${numero} not found.`);
        } else {
          console.log('Error deleting Document.');
        }
      })
      .catch(error => console.error('Error deleting Document:', error));
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
  };


  const filteredDocuments = documents.filter(
    (document) =>
    document.numero_document.toLowerCase().includes(searchTerm)
  );
  
  

  return (
    <div className="page-container">
      <Header />
      <h1>Documents</h1>
      <div className="action-links">
      <Link to="/add-document">Créer un Document</Link>
      <Link to="/edit-document">Modifier un Document</Link>
      <Link to="/delete-document">Supprimer un Document</Link>
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
          {filteredDocuments.map(document => (
            <tr key={document.id_document}>
              <td>{document.designation_document}</td>
              <td>{document.numero_document}</td>
              <td>{document.observation_document}</td>
              <td>
                <button onClick={() => handleEdit(document.id_document)}>Modifier</button>
                <button onClick={() => handleDeleteConfirmation(document.numero_document)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Documents;