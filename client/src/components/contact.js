import React, { useState } from 'react';
import Footer from './footer';
import HeaderBefore from './headerbefore';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter ici la logique pour envoyer le message par e-mail ou via une API.
    // Par exemple, vous pouvez utiliser axios pour envoyer les données au backend.
    // Assurez-vous d'ajouter la validation des données avant d'envoyer le message.

    // Réinitialisez les champs après avoir envoyé le message.
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <HeaderBefore />
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Objet :</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
      
      <Footer />
    </div>
  );
}

export default Contact;
