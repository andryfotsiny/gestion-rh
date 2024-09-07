import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ history }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion (peut-être une API call)
    // Modifiez ici les identifiants pour tester
    if (username === 'a' && password === 'a') {
      history.push('/dashboard');
    } else {
      alert('Identifiants incorrects, veuillez réessayer.');
    }
  };

  return (
    <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Nom d'utilisateur:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;
