// src/Pages/HomePage.js
import React from 'react';
import ParticlesComponent from '../components/Particles'; // Import the Particles component
import './HomePage.css'; // Import custom CSS for the page
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for routing

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Add the ParticlesComponent as a background */}
      <ParticlesComponent id="particles-background" />

      {/* Content that will be displayed over the particles */}
      <div className="content">
        <div>
          <h1>Welcome to your SafeSpace</h1>
          <br />
        </div>

        <motion.div
          className="first-motion"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <p>
            Welcome to your sanctuary, a space where your thoughts can flow freely, untouched by judgment or whispers.
          </p>
        </motion.div>

        <motion.div
          className="spaced-motion"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <img src="https://i.ibb.co/Lrc90xZ/Constellation-Circle2.png" alt="Constellation_circle" />
          <p>
            This is more than just a journal; it's a compassionate listener powered by AI. As you pour out your thoughts, you can ask for gentle analysis to uncover patterns, insights, and pathways to healing. It’s therapy-like feedback, thoughtful and understanding, always there to help you navigate your mind.
          </p>
          <p>
            Whether you need clarity or simply a moment to breathe, let the reflections guide you. Here, every word you write is met with care.
          </p>
        </motion.div>

        <motion.div
          className="spaced-motion2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <p>
            Feeling overwhelmed or just want to talk? Our AI-powered chatbot is ready to listen. It’s a conversation without pressure, a companion that responds with empathy and understanding whenever you need it most.
          </p>
          <p>
            This is your space to write, to heal, and to connect with the support you deserve. Your thoughts are safe here.
          </p>

          {/* Get Started Button */}
          <Link className="get-started-button" to="/login">
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
