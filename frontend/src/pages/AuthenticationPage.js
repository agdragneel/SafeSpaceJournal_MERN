// src/pages/AuthenticationPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Register from '../components/Register';
import Login from '../components/Login';

const AuthenticationPage = ({ onLogin }) => {
  const navigate = useNavigate(); // Create the navigate function

  const handleLoginSuccess = (token) => {
    onLogin(token); // Call onLogin to update the user state
    navigate('/journal'); // Navigate to the JournalPage after successful login
  };

  const handleRegistrationSuccess = (token) => {
    onLogin(token); // Call onLogin to update the user state
    navigate('/journal'); // Navigate to the JournalPage after successful registration
  };

  return (
    <div>
      <h1>Authentication</h1>
      <Register onLogin={handleRegistrationSuccess} />
      <Login onLogin={handleLoginSuccess} />
    </div>
  );
};

export default AuthenticationPage;
