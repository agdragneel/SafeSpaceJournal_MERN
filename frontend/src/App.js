import React, { useState } from 'react';
import AuthenticationPage from './pages/AuthenticationPage';
import JournalPage from './pages/JournalPage';

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
    <div className="App">
      {!user ? (
        <AuthenticationPage onLogin={handleLogin} />
      ) : (
        <JournalPage onLogout={handleLogout} token={user} />
      )}
    </div>
  );
}

export default App;
