import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/planning.css';

function Planning() {
    const [services, setServices] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const authToken = localStorage.getItem('token');

    useEffect(() => {
      // Fetch services from Django API
      // Récupérer le jeton d'authentification depuis le stockage local
      axios.get('http://127.0.0.1:8000/api/services/?format=json', {
        headers: {
          'Authorization': `Token ${authToken}`, // Ajouter le jeton d'authentification aux en-têtes
        },
      })
        .then(response => {
          const serviceData = response.data;
          setServices(serviceData);
        })
        .catch(error => {
          console.error('Error fetching services:', error);
        });

      // Fetch all instruments from Django API
      axios.get('http://127.0.0.1:8000/api/instruments/?format=json', {
        headers: {
          'Authorization': `Token ${authToken}`, // Ajouter le jeton d'authentification aux en-têtes
        },
      })
        .then(response => {
          const instrumentData = response.data;
          setInstruments(instrumentData);
        })
        .catch(error => {
          console.error('Error fetching instruments:', error);
        });
    }, []);

    const handleGeneratePDF = async () => {
      if (!selectedService && !selectedMonth) {
        alert('Veuillez sélectionner un service et un mois d\'étalonnage.');
        return;
      }

      const filteredInstruments = instruments.filter(
        (instrument) =>
          (!selectedService || instrument.service_instrument === parseInt(selectedService)) &&
          (selectedMonth === '' || instrument.mois_etalonnage === selectedMonth)
      );
    
      const doc = new jsPDF();
    
      // Add content to the PDF document
      const currentYear = new Date().getFullYear();
      const title = `Planning d'étalonnage/vérifications`;
      // Find the selected service by matching its ID
      const service = services.find((service) => service.id_service === parseInt(selectedService));
      const header = `Section ${service.numero_service} - ${selectedMonth} ${currentYear}`;
      
      doc.text(title, 105, 10, 'center');
      doc.text(header, 10, 20);
    
      // Create a table for displaying instrument details
      const instrumentDataArray = await Promise.all(
        filteredInstruments.map(async (instrument) => {
          const {
            id_instrument,
            designation_instrument,
            numero_interne_instrument,
            reference_instrument,
            frequence_controle,
          } = instrument;
    
          // Fetch operations for the instrument to get the last calibration date
          const operationsResponse = await axios.get(
            `http://127.0.0.1:8000/api/operationetalonnages/operations-instrument/${id_instrument}/`
            , {
              headers: {
                'Authorization': `Token ${authToken}`, // Ajouter le jeton d'authentification aux en-têtes
              },
            });
          const operations = operationsResponse.data;
    
          // Calculate the last calibration date
          const lastCalibrationDate = operations.reduce((latestDate, operation) => {
            const operationDate = new Date(operation.date_etalonnage);
            return operationDate > latestDate ? operationDate : latestDate;
          }, new Date(0));
    
          // Calculate the next calibration date
          const nextCalibrationDate = new Date(lastCalibrationDate);
          nextCalibrationDate.setMonth(nextCalibrationDate.getMonth() + parseInt(frequence_controle));
    
          return [
            numero_interne_instrument,
            designation_instrument,
            reference_instrument,
            frequence_controle,
            lastCalibrationDate.toLocaleDateString(),
            nextCalibrationDate.toLocaleDateString(), // Add the next calibration date
          ];
        })
      );
    
      doc.autoTable({
        startY: 30,
        head: [
          ['N° Interne', 'Désignation', 'Référence', 'Fréquence de Contrôle', 'Dernier Étalonnage', 'Prochains Étalonnages'],
        ],
        body: instrumentDataArray,
      });
    
      // Add the current date to the PDF
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Date d'établissement : ${currentDate}`, 10, doc.autoTable.previous.finalY + 10);
    
      // Save the PDF with the specified filename
      doc.save(`Planning_${selectedService}_${selectedMonth}_${currentYear}.pdf`);
    };

    const handleCancel = () => {
      window.location.href = `/etats`;
    };
    

  return (
    <div className='page-container-planning'>
      <Link to="/etats">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Impression d'un Planning</h2>
      <text>Choisissez les informations "Service" et "Mois" pour imprimer votre planning</text>
      <div className="search-filters">
      <label>Service :</label>
        <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
          <option value="">Sélectionnez un service</option>
          {services.map(service => (
            <option key={service.id_service} value={service.id_service}>
              {service.designation_service}
            </option>
          ))}
        </select>
      <label>Mois d'étalonnage :</label>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="">Sélectionnez un mois</option>
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        </div>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleGeneratePDF}>Imprimer</button>
      </div>
    </div>
  );
}

export default Planning;