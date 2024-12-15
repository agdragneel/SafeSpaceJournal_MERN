// src/Pages/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar'; // Updated import path for Navbar

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Journaling App!</h1>
      <p>This is a safe space to write and reflect on your daily experiences.</p>
      <p>Here you can post new journal entries and revisit your old ones.</p>
      <p>Feel free to explore and start journaling your thoughts!</p>
    </div>
  );
};

export default HomePage;
