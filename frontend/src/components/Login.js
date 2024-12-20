// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Ensure the styles are correctly imported

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/login', formData);
      alert(data.message);
      
      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Call the onLogin prop to set user
      onLogin(data.token); 
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoComplete="off" // Disable autofill for the email field
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="new-password" // Disable autofill for the password field
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
