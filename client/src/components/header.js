import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg';
import './../styles/header.css';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="header">
      <nav>
        <ul>
          <Link to="/instruments">
            <li>
              <img src={logo} alt="Logo Electro-Industries Azazga" />
            </li>
          </Link>
          <li><Link to="/instruments" className="nav-link"><text>Instruments</text></Link></li>
          <li><Link to="/materiels" className="nav-link"><text>Matériels</text></Link></li>
          <li><Link to="/documents" className="nav-link"><text>Documents</text></Link></li>
          <li><Link to="/normes" className="nav-link"><text>Normes</text></Link></li>
          <li><Link to="/etats" className="nav-link"><text>États</text></Link></li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="logout-button">Déconnexion</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

export default Header;

