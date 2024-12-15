// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import AuthenticationPage from './pages/AuthenticationPage'; // Correct path to AuthenticationPage
import JournalPage from './pages/JournalPage'; // Correct path to JournalPage
import HomePage from './pages/HomePage'; // Correct path to HomePage

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    // Save the token and update the user state
    localStorage.setItem('token', token);
    setUser(token);
  };

  const handleLogout = () => {
    // Remove the token from localStorage and clear user state
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes> {/* Replaced Switch with Routes */}
          <Route path="/" element={<HomePage />} /> {/* Replaced component with element */}
          <Route path="/login" element={<AuthenticationPage onLogin={handleLogin} />} />
          <Route
            path="/journal"
            element={
              !user ? (
                <AuthenticationPage onLogin={handleLogin} />
              ) : (
                <JournalPage onLogout={handleLogout} token={user} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
