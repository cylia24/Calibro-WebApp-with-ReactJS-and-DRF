import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './header';
import './../styles/affecter.css';

// Fonction d'affectation d'une norme à un instrument donnée
function AffecterNormes() {
  const { numero_interne_instrument } = useParams();
  const [normes, setNormes] = useState([]);
  const [ListIdNormes, setListIdNormes] = useState([]);
  const [NormesDetails, setNormesDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('nonAffectes');
  const [searchValue, setSearchValue] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Récupérer la liste complète des normes
    fetch('http://127.0.0.1:8000/api/normes/', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setNormes(data))
      .catch(error => console.error('Error fetching normes:', error));

    // Récupérer les informations de l'instrument dont le numero est numero_interne_instrument
    fetch(`http://127.0.0.1:8000/api/instruments/detail/${numero_interne_instrument}`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Récupérer la listes des identifiants des normes de l'instrument
        setListIdNormes(data.normes_instrument);
      })
      .catch(error => console.error('Error fetching instrument details:', error));
  }, [numero_interne_instrument]);

  // Récupérer les détails d'une norme d'un instrument
  useEffect(() => {
    const fetchNormeDetails = async () => {
      const promises = ListIdNormes.map(normeId => {
        return fetch(`http://127.0.0.1:8000/api/normes/${normeId}/`, {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
        })
          .then(response => response.json());
      });

      const details = await Promise.all(promises);
      setNormesDetails(details);
    };

    fetchNormeDetails();
  }, [ListIdNormes]);
  // Filtre sur la liste des normes = Normes / {normes de l'instrument}
  const filteredNormes = normes.filter(norme => !ListIdNormes.includes(norme.id_norme));

  const handleAffecter = (normeId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/affecter-norme/${numero_interne_instrument}/${normeId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Norme affected:', data);
        window.location.reload();
      })
      .catch(error => console.error('Error affecting norme:', error));
  };

  const handleAnnulerAffecter = (normeId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/annuler-affectation-norme/${numero_interne_instrument}/${normeId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Affectation cancelled for Norme:', data);
        window.location.reload();
      })
      .catch(error => console.error('Error cancelling affectation:', error));
  };

  return (
    <div className="page-container-instruments">
      <Header />
      <h2>Affectation de normes à l'instrument</h2>
      <div className="tab-menu">
        <button className={activeTab === 'nonAffectes' ? 'active' : ''} onClick={() => setActiveTab('nonAffectes')}>
          Normes non affectées
        </button>
        <button className={activeTab === 'affectes' ? 'active' : ''} onClick={() => setActiveTab('affectes')}>
          Normes affectées
        </button>
      </div>

      {activeTab === 'affectes' && (
        <div>
          <div className='search-filters'>
          <input
            type="text"
            placeholder="Tapez un N°"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          </div>
          <table className="objet-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>N°</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {NormesDetails
                .filter(norme =>
                  norme.numero_norme.includes(searchValue)
                )
                .map(norme => (
                  <tr key={norme.id_norme}>
                    <td>{norme.designation_norme}</td>
                    <td>{norme.numero_norme}</td>
                    <td>
                      <button onClick={() => handleAnnulerAffecter(norme.id_norme)}>Annuler l'affectation</button>
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
                <th>N°</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNormes
                .filter(norme =>
                    norme.numero_norme.includes(searchValue)
                )
                .map(norme => (
                  <tr key={norme.id_norme}>
                    <td>{norme.designation_norme}</td>
                    <td>{norme.numero_norme}</td>
                    <td>
                      <button onClick={() => handleAffecter(norme.id_norme)}>Affecter</button>
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

export default AffecterNormes;