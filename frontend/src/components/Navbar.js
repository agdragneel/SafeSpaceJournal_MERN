// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-logo-link" to="/">SafeSpace</Link>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
        <li className="navbar-item"><Link className="navbar-link" to="/contact">Contact</Link></li>
        {user ? (
          <li className="navbar-item">
            <Link className="navbar-link navbar-button" to="/" onClick={onLogout}>Logout</Link>
          </li>
        ) : (
          <li className="navbar-item"><Link className="navbar-link" to="/login">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
