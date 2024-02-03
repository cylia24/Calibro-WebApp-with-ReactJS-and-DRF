import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './header';
import './../styles/details.css';

function DetailInstrument() {
  const { numero_interne_instrument } = useParams();
  const [instrumentDetails, setInstrumentDetails] = useState({});
  const [services, setServices] = useState([]);
  
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Fetch instrument details
    fetch(`http://127.0.0.1:8000/api/instruments/detail/${numero_interne_instrument}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setInstrumentDetails(data);
      })
      .catch(error => console.error('Error fetching instrument details:', error));
    
    // Fetch services from Django API
    fetch('http://127.0.0.1:8000/api/services/?format=json', {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, [numero_interne_instrument]);


  const handleAffecterMateriels = (numeroInterne) => {
    window.location.href = `/materiels-instrument/${numeroInterne}`;}

  const handleAffecterDocuments = (numeroInterne) => {
    window.location.href = `/documents-instrument/${numeroInterne}`;}

  const handleAffecterNormes = (numeroInterne) => {
    window.location.href = `/normes-instrument/${numeroInterne}`;}

  const handleEtalonner = (id_instrument) => {
    window.location.href = `/etalonner-instrument/${id_instrument}`;}
  
  function getNumeroService(serviceInstrument) {
    const matchingService = services.find(service => service.id_service === serviceInstrument);
    return matchingService ? matchingService.numero_service : '';
  }


  return (
    <div className="page-container">
      <Header />
      <h2>Informations sur {instrumentDetails.designation_instrument}</h2>
      <div className='buttons-detail'>
      <button onClick={() => handleAffecterMateriels(instrumentDetails.numero_interne_instrument)}>Affecter un Matériel</button>
      <button onClick={() => handleAffecterDocuments(instrumentDetails.numero_interne_instrument)}>Affecter un Document</button>
      <button onClick={() => handleAffecterNormes(instrumentDetails.numero_interne_instrument)}>Affecter une Norme</button>
      <button onClick={() => handleEtalonner(instrumentDetails.id_instrument)}>Étalonner</button>
      </div>
      <div className="details-table">
      <table>
      <tbody>
          <tr>
              <td className='titre'>N° d'Identification</td>
              <td className='info'>{instrumentDetails.reference_instrument}</td>
          </tr>
          <tr>
              <td className='titre'>N° interne</td>
              <td className='info'>{instrumentDetails.numero_interne_instrument}</td>
          </tr>
          <tr>
              <td className='titre'>Désignation</td>
              <td className='info'>{instrumentDetails.designation_instrument}</td>
          </tr>
          <tr>
              <td className='titre'>Mois d'étalonnage</td>
              <td className='info'>{instrumentDetails.mois_etalonnage}</td>
          </tr>
          <tr>
              <td className='titre'>État de l'instrument</td>
              <td className='info'>{instrumentDetails.etat_instrument}</td>
          </tr>
          <tr>
              <td className='titre'>Fréquence du contrôle</td>
              <td className='info'>{instrumentDetails.frequence_controle}</td>
          </tr>
          <tr>
              <td className='titre'>Critère d'acceptation</td>
              <td className='info'>{instrumentDetails.critere_acceptation}</td>
          </tr>
          <tr>
              <td className='titre'>N° Service</td>
              <td className='info'>{getNumeroService(instrumentDetails.service_instrument)}</td>
          </tr>
          <tr>
              <td className='titre'>Type</td>
              <td className='info'>{instrumentDetails.type_instrument}</td>
          </tr>
          <tr>
              <td className='titre'>Observation</td>
              <td className='info'>{instrumentDetails.observation_instrument}</td>
          </tr>
      </tbody>
      </table>


    </div>
    </div>
  );
}

export default DetailInstrument;
