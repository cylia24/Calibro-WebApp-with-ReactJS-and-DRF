import React, { useEffect, useState } from 'react';

function User() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupérer le token d'authentification depuis le stockage local (localStorage)
        const authToken = localStorage.getItem('token');
        // console.log('Token d\'authentification :', authToken);

        if (authToken) {
            // Effectuer une requête GET pour obtenir les informations de l'utilisateur
            fetch('http://localhost:8000/api/user/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    console.error('L\'utilisateur n\'est pas connecté.');
                    // Gérer le cas où l'utilisateur n'est pas connecté, par exemple, rediriger vers la page de connexion
                } else {
                    console.error('Erreur lors de la récupération des détails de l\'utilisateur.');
                }
            })
            .then(data => {
                if (data) {
                    setUser(data);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
            });
        } else {
            console.error('Aucun token d\'authentification trouvé.');
            // Gérer le cas où aucun token d'authentification n'est trouvé, par exemple, rediriger vers la page de connexion
        }
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>Informations de l'utilisateur :</h2>
                    <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                </div>
            ) : (
                <p>Aucun utilisateur connecté.</p>
            )}
        </div>
    );
}

export default User;