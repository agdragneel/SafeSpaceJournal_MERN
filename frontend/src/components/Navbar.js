// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
        <li className="navbar-item"><Link className="navbar-link" to="/about">About</Link></li>
        <li className="navbar-item"><Link className="navbar-link" to="/contact">Contact</Link></li>
        {user ? (
          <li className="navbar-item">
            <Link className="navbar-link " to="/" onClick={onLogout}>Logout</Link>
          </li>
        ) : (
          <li className="navbar-item"><Link className="navbar-link" to="/login">Login/Register</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
