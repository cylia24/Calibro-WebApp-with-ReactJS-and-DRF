import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import './../styles/pagesobjets.css';

function EtalonnerInstrument() {
  const { id_instrument } = useParams();
  const [operations, setOperations] = useState([]);
  const [instrument, setInstrument] = useState([]);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Récupérer les opérations ayant comme instrument l'instrument avec l'id en paramètres "id_instrument"
    axios.get(`http://127.0.0.1:8000/api/operationetalonnages/operations-instrument/${id_instrument}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        setOperations(response.data);
      })
      .catch(error => {
        console.error('Erreur de récupération des opérations:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/instruments/detail-id/${id_instrument}/`, {
      headers: {
        'Authorization': `Token ${authToken}`,
      },
    })
      .then(response => {
        setInstrument(response.data);
      })
      .catch(error => {
        console.error('Erreur de récupération de instrument:', error);
      });
  }, [id_instrument]);

  function deleteOperation(id_operation) {
    const confirmed = window.confirm('Ètes-vous certain de vouloir supprimer cette opération?');

    if (confirmed) {
      axios.delete(`http://127.0.0.1:8000/api/operationetalonnages/delete/${id_operation}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
        .then(response => {
          window.location.href = `/etalonner-instrument/${id_instrument}`;
        })
        .catch(error => {
          console.error('Erreur de suppression:', error);
        });
    }
  }


  return (
    <div className="page-container">
      <Header />
      <h1>Étalonnage</h1>
      <div className="action-links">
      <Link to={`/add-operation/${id_instrument}`}>Créer une opération</Link>
      </div>
      <table className="objet-table">
        <thead>
          <tr>
            <th>N° chron</th>
            <th>Résultat Opération</th>
            <th>Observation</th>
            <th>Numéro PV</th>
            <th>Date Étalonnage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation, index) => (
            <tr key={operation.id_operation}>
              <td>{index + 1}</td>
              <td>{operation.resultat_operation}</td>
              <td>{operation.observation_etalonnage}</td>
              <td>{operation.numero_pv}</td>
              <td>{operation.date_etalonnage.substring(0, 10)}</td>
              <td>
                <Link to={`/edit-operation/${operation.id_operation}`}>
                  <button>Modifier</button>
                </Link>
                <button onClick={() => deleteOperation(operation.id_operation)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EtalonnerInstrument;
