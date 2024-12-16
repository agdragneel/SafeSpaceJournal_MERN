// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure the styles are imported

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
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
      const { data } = await axios.post('http://localhost:5001/api/auth/register', formData);
      alert(data.message);
      onLogin(data.token); // Call the onLogin prop to set user
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="register-form">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          autoComplete="off"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          autoComplete="off"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          required
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
