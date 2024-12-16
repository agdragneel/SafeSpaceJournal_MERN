// src/pages/AuthenticationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesComponent from '../components/Particles'; // Import the Particles component
import Register from '../components/Register';
import Login from '../components/Login';
import './AuthenticationPage.css'; // Import scoped CSS for the page

const AuthenticationPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // State to toggle between Login and Register

  const handleLoginSuccess = (token) => {
    onLogin(token);
    navigate('/journal');
  };

  const handleRegistrationSuccess = (token) => {
    onLogin(token);
    navigate('/journal');
  };

  return (
    <div className="auth-page">
      <ParticlesComponent id="auth-particles-background" />
      <div className="auth-content">
        {/* <h1 className="auth-heading">Authentication</h1> */}

        {isLogin ? (
          <div className="auth-section">
            <Login onLogin={handleLoginSuccess} />
            <p className="auth-toggle">
              Don't have an account?{' '}
              <span className="auth-link" onClick={() => setIsLogin(false)}>
                Sign Up
              </span>
            </p>
          </div>
        ) : (
          <div className="auth-section">
            <Register onLogin={handleRegistrationSuccess} />
            <p className="auth-toggle">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => setIsLogin(true)}>
                Sign In
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationPage;
