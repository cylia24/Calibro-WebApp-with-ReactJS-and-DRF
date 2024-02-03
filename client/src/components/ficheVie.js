import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function FicheVie() {
  const [instrumentNumber, setInstrumentNumber] = useState('');
  // const [operations, setOperations] = useState([]);
  const [remarque, setRemarque] = useState('');

  const handleGeneratePDF = () => {
    // Fetch operations data for the given instrumentNumber
    const authToken = localStorage.getItem('token');

    axios.get(`http://127.0.0.1:8000/api/instruments/detail/${instrumentNumber}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
      .then(response => {
        const instrumentData = response.data;
        setRemarque('');
  
        // Fetch operations based on instrumentId
        axios.get(`http://127.0.0.1:8000/api/operationetalonnages/operations-instrument/${instrumentData.id_instrument}/`, {
          headers: {
            'Authorization': `Token ${authToken}`,
          },
        })
          .then(operationsResponse => {
            const operationsData = operationsResponse.data;
  
            // Create a new jsPDF document
            const doc = new jsPDF();
  
            // Add title
            doc.setFontSize(20);
            doc.text(`FICHE DE VIE`, 105, 15, 'center');
  
            // Add instrument information
            doc.setFontSize(12);
            doc.text(`N° d'Identifi. : ${instrumentData.reference_instrument}`, 10, 30);
            doc.text(`N° Interne : ${instrumentData.numero_interne_instrument}`, 10, 40);
            doc.text(`Désignation : ${instrumentData.designation_instrument}`, 10, 50);
            doc.text(`Intervale de Contrôle : ${instrumentData.frequence_controle}`, 10, 60);
            doc.text(`Critère d'Acceptation: ${instrumentData.critere_acceptation}`, 10, 70);
            doc.text(`Affectation : ${instrumentData.service_instrument}`, 10, 80);
  
            // Define table headers
            const headers = [['N° chron', 'Résultat de contrôle', 'Obs.', 'N° PV', 'Date']];
            let operationNumber = 1;
  
            // Extract data for the table
            const data = operationsData.map(operation => [
              operationNumber++,
              operation.resultat_operation,
              operation.observation_etalonnage,
              operation.numero_pv,
              operation.date_etalonnage.substring(0, 10),
            ]);
  
            // Add the table to the PDF
            doc.autoTable({
              head: headers,
              body: data,
              startY: 110, // Adjust the starting Y position for the table
            });
  
            // Save the PDF with a filename
            doc.save(`Instrument_${instrumentNumber}_FicheVie.pdf`);
          })
          .catch(error => {
            console.error('Error fetching operations data:', error);
          });
      })
      .catch(error => {
        setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
        console.error('Error fetching instrument details:', error);
      });
  };

  const handleCancel = () => {
    window.location.href = `/etats`;
  };


  return (
    <div className='page-container-create'>
      <Link to="/etats">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Impression d'une fiche de vie</h2>
      <text>Il faut saisir le numéro interne de d'un instrument, pour imprimer sa fiche de vie.</text>
      <div className="form-group">
      <label>N° Interne :</label>
        <input
          type="text"
          value={instrumentNumber}
          onChange={e => setInstrumentNumber(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleGeneratePDF}>Imprimer</button>
      </div>
    </div>
  );
}

export default FicheVie;
