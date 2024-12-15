// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user ? (
          <li><button onClick={onLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login/Register</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
