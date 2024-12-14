import React, { useState } from 'react';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import Journal from './components/Journal';

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
        <>
          <Register onLogin={handleLogin} />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Journal token={user} />
        </>
      )}
    </div>
  );
}

export default App;
