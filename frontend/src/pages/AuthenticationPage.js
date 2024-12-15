import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const AuthenticationPage = ({ onLogin }) => {
  return (
    <div>
      <h1>Authentication</h1>
      <Register onLogin={onLogin} />
      <Login onLogin={onLogin} />
    </div>
  );
};

export default AuthenticationPage;
