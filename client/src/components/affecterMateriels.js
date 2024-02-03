import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './header';
import './../styles/affecter.css';

function AffecterMateriels() {
  const { numero_interne_instrument } = useParams();
  const [materiels, setMateriels] = useState([]);
  const [ListIdMateriels, setListIdMateriels] = useState([]);
  const [materielsDetails, setMaterielsDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('nonAffectes');
  const [searchValue, setSearchValue] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // La liste complète des matériels
    fetch('http://127.0.0.1:8000/api/materiels/', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setMateriels(data))
      .catch(error => console.error('Error fetching materiels:', error));

    // Les matériels associés à l'instrument
    fetch(`http://127.0.0.1:8000/api/instruments/detail/${numero_interne_instrument}`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setListIdMateriels(data.materiels_instrument);
      })
      .catch(error => console.error('Error fetching instrument details:', error));
  }, [numero_interne_instrument]);

  // Les détails des matériels associés à l'instrument
  useEffect(() => {
    const fetchMaterielDetails = async () => {
      const promises = ListIdMateriels.map(materielId => {
        return fetch(`http://127.0.0.1:8000/api/materiels/${materielId}/`, {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
        })
          .then(response => response.json());
      });

      const details = await Promise.all(promises);
      setMaterielsDetails(details);
    };

    fetchMaterielDetails();
  }, [ListIdMateriels]);

  const filteredMateriels = materiels.filter(materiel => !ListIdMateriels.includes(materiel.id_materiel));
  const handleAffecter = (materielId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/affecter-materiel/${numero_interne_instrument}/${materielId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Materiel affected:', data);
        // Refresh the page
        window.location.reload();
      })
      .catch(error => console.error('Error affecting materiel:', error));
  };

  const handleAnnulerAffecter = (materielId) => {
    fetch(`http://127.0.0.1:8000/api/instruments/annuler-affectation-materiel/${numero_interne_instrument}/${materielId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Affectation cancelled for Materiel:', data);
        window.location.reload();
        // Refresh the page 
      })
      .catch(error => console.error('Error cancelling affectation:', error));
  };
  
   return (
    <div className="page-container-instruments">
      <Header />
      <h2>Affectation de matériels l'instrument</h2>
      <div className="tab-menu">
        <button className={activeTab === 'nonAffectes' ? 'active' : ''} onClick={() => setActiveTab('nonAffectes')}>
          Matériels non affectés
        </button>
        <button className={activeTab === 'affectes' ? 'active' : ''} onClick={() => setActiveTab('affectes')}>
          Matériels affectés
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
          <th>Designation</th>
          <th>N° Interne</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {materielsDetails
          .filter(materiel =>
            materiel.numero_interne_materiel.includes(searchValue)
          )
          .map(materiel => (
            <tr key={materiel.id_materiel}>
              <td>{materiel.designation_materiel}</td>
              <td>{materiel.numero_interne_materiel}</td>
              <td>
                <button onClick={() => handleAnnulerAffecter(materiel.id_materiel)}>Annuler l'affectation</button>
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
              {filteredMateriels
                .filter(materiel =>
                  materiel.numero_interne_materiel.includes(searchValue)
                )
                .map(materiel => (
                  <tr key={materiel.id_materiel}>
                    <td>{materiel.designation_materiel}</td>
                    <td>{materiel.numero_interne_materiel}</td>
                    <td>
                      <button onClick={() => handleAffecter(materiel.id_materiel)}>Affecter</button>
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

export default AffecterMateriels;