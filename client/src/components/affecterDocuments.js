import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './header';
import './../styles/affecter.css';

function AffecterDocuments() {
  const { numero_interne_instrument } = useParams();
  const [documents, setDocuments] = useState([]);
  const [ListIdDocuments, setListIdDocuments] = useState([]);
  const [documentsDetails, setDocumentsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('nonAffectes');
  const [searchValue, setSearchValue] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // La liste complète des documents
    fetch('http://127.0.0.1:8000/api/documents/', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));

    // Les documents associés à l'instrument
    fetch(`http://127.0.0.1:8000/api/instruments/detail/${numero_interne_instrument}`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setListIdDocuments(data.documents_instrument);
      })
      .catch(error => console.error('Error fetching instrument details:', error));
  }, [numero_interne_instrument]);

  // Les détails des documents associés à l'instrument
  useEffect(() => {
    const fetchDocumentDetails = async () => {
      const promises = ListIdDocuments.map(documentId => {
        return fetch(`http://127.0.0.1:8000/api/documents/${documentId}/`, {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
        })
          .then(response => response.json());
      });

      const details = await Promise.all(promises);
      setDocumentsDetails(details);
    };

    fetchDocumentDetails();
  }, [ListIdDocuments]);

  const filteredDocuments = documents.filter(document => !ListIdDocuments.includes(document.id_document));

  const handleAffecter = (documentId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/affecter-document/${numero_interne_instrument}/${documentId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Document affected:', data);
        window.location.reload();
      })
      .catch(error => console.error('Error affecting document:', error));
  };

  const handleAnnulerAffecter = (documentId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/annuler-affectation-document/${numero_interne_instrument}/${documentId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Affectation cancelled for Document:', data);
        window.location.reload();
      })
      .catch(error => console.error('Error cancelling affectation:', error));
  };

  return (
    <div className="page-container-instruments">
      <Header />
      <h2>Affectation de documents à l'instrument</h2>
      <div className="tab-menu">
        <button className={activeTab === 'nonAffectes' ? 'active' : ''} onClick={() => setActiveTab('nonAffectes')}>
          Documents non affectés
        </button>
        <button className={activeTab === 'affectes' ? 'active' : ''} onClick={() => setActiveTab('affectes')}>
          Documents affectés
        </button>
      </div>

      {activeTab === 'affectes' && (
        <div>
          <div className='search-filters'>
          <input
            type="text"
            placeholder="Tapez un N° interne"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          </div>
          <table className="objet-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>N° Interne</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documentsDetails
                .filter(document =>
                  document.numero_document.includes(searchValue)
                )
                .map(document => (
                  <tr key={document.id_document}>
                    <td>{document.designation_document}</td>
                    <td>{document.numero_document}</td>
                    <td>
                      <button onClick={() => handleAnnulerAffecter(document.id_document)}>Annuler l'affectation</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'nonAffectes' && (
        <div>
          <div className='search-filters'>
          <input
            type="text"
            placeholder="Tapez un N° interne"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          </div>
          <table className="objet-table">
            <thead>
              <tr>
                <th>Designation</th>
                <th>N° Interne</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments
                .filter(document =>
                  document.numero_document.includes(searchValue)
                )
                .map(document => (
                  <tr key={document.id_document}>
                    <td>{document.designation_document}</td>
                    <td>{document.numero_document}</td>
                    <td>
                      <button onClick={() => handleAffecter(document.id_document)}>Affecter</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default AffecterDocuments;
