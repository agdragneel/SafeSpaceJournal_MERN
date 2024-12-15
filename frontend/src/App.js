// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage'; // Correct path to AuthenticationPage
import JournalPage from './pages/JournalPage'; // Correct path to JournalPage
import HomePage from './pages/HomePage'; // Correct path to HomePage
import Navbar from './components/Navbar'; // Import Navbar

function App() {
  const [user, setUser] = useState(null);

  // Check if the token exists in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser(storedToken); // If token exists, set the user to the token
    }
  }, []);

  const handleLogin = (token) => {
    // Save the token in localStorage and update the user state
    localStorage.setItem('token', token);
    setUser(token);
  };

  const handleLogout = () => {
    // Remove token from localStorage and clear user state
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {/* Include Navbar on every page */}
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          {/* HomePage does not require authentication */}
          <Route path="/" element={<HomePage />} />

          {/* AuthenticationPage for login */}
          <Route path="/login" element={<AuthenticationPage onLogin={handleLogin} />} />

          {/* JournalPage is protected by authentication */}
          <Route
            path="/journal"
            element={
              user ? (
                <JournalPage  token={user} /> // User is logged in
              ) : (
                <AuthenticationPage onLogin={handleLogin} /> // User is not logged in
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
