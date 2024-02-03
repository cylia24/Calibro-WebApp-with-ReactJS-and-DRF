import React, { useState } from 'react';
import axios from 'axios';
import logo from './images/logo.svg';
import calibration from './images/calibration.png';
import './../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remarque, setRemarque] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      });
      const token = response.data.token;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // console.log('Token d\'authentification :', token);

      // Redirect to the user page after successful login
      window.location.href = '/instruments'; // Change the URL to the user page
    } catch (error) {
        setRemarque("Nom d'utilisateur ou mot de passe incorrect!");
    }
  };

  return (
    <div className="page-login-body">
    <div className="main-content">
        <img src={calibration} alt="Calibration Electro-Industries Azazga" />
    </div>
    <div className='main-content'>
    <div className="container-login">
      <Link to="/">
        <img src={logo} alt="Logo Electro-Industries Azazga" />
      </Link>
      <h2 className="title-login">Se connecter</h2>
      <div className="champ-login">
      <text className='Remarque'>{remarque}</text>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <a href="#" className="forgot-password-link">Mot de passe oublié?</a>
      </div>
      <button onClick={handleLogin} className="button-login">
        Se connecter
      </button>
      <br />
      <a href="#" className="inscription-link">S'inscrire</a>
    </div>
    </div>
    <div className="main-content">
    <p>
      Plus d'informations sur Calibro et ses fonctionnalités. Découvrez comment nous pouvons vous aider dans votre processus de calibration.
    </p>
    <Link to="/about" className="learn-more-btn">En savoir plus</Link>
  </div>
    </div>
  );
};

export default Login;

