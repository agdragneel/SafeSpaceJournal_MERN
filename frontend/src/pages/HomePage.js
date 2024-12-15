// src/Pages/HomePage.js
import React from 'react';
import ParticlesComponent from '../components/Particles';  // Import the Particles component
import './HomePage.css';  // Import custom CSS for the page

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Add the ParticlesComponent as a background */}
      <ParticlesComponent id="particles-background" />

      {/* Content that will be displayed over the particles */}
      <div className="content">
        <h1>Welcome to your Safe Space</h1>
        <br/>
        <p>Welcome to your sanctuary, a space where your thoughts can flow freely, untouched by judgment or whispers.</p>
        <p>Here, your words are yours alone, a place for quiet reflection and honest venting, with the gentle guidance of AI to support your journey.</p>
        <p>Stay a while, and feel at home.</p>
      </div>
    </div>
  );
};

export default HomePage;
