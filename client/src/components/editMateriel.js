import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import { Link } from 'react-router-dom';
import './../styles/formulaire.css';

function EditMateriel() {
  const [numeroInterne, setNumeroInterne] = useState('');
  // const [materielDetails, setMaterielDetails] = useState(null);
  const [remarque, setRemarque] = useState('');

  const authToken = localStorage.getItem('token');

  const handleEditMateriel = () => {
    if (numeroInterne) {
      // Materiel details using the entered numeroInterne
      axios.get(`http://127.0.0.1:8000/api/materiels/detail/${numeroInterne}/`, {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      })
        .then(response => {
          // Redirect to edit page with materiel id
          if (response.data.id_materiel) {
            window.location.href = `/edit-materiel/${response.data.id_materiel}`;
          }
        })
        .catch(error => {
          setRemarque("Attention : Le numéro que vous avez saisi est incorrect.");
          console.error('Error fetching materiel details:', error);
        });
    }
  };

  const handleCancel = () => {
    window.location.href = `/materiels`;
  };

  return (
    <div className='page-container-create'>
      <Link to="/materiels">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2>Modifier un matériel</h2>
      <text>Il faut saisir le numéro interne du matériel à modifier.</text>
      <div className="form-group">
      <label>
        Numéro Interne du matériel :</label>
        <input
          type="text"
          value={numeroInterne}
          onChange={(e) => setNumeroInterne(e.target.value)}
        />
      </div>
      <text>{remarque}</text>
      <div className="buttons">
      <button className='button-form' onClick={handleCancel}>Annuler</button>
      <button className='button-form' onClick={handleEditMateriel}>Modifier</button>
      </div>
    </div>
  );
}

export default EditMateriel;