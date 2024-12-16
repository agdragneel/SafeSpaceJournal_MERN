import React, { useState } from 'react';
import ParticlesComponent from '../components/Particles'; // Import the Particles component
import './ContactPage.css'; // Import custom CSS for the page

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Icons for Email, Phone, and Form

const ContactPage = () => {
  const [activeSection, setActiveSection] = useState(null); // Track the active section to display (email, form, phone)
  const [highlightedIcon, setHighlightedIcon] = useState(null); // Track which icon is highlighted

  const handleIconClick = (section) => {
    setActiveSection(section);
    setHighlightedIcon(section); // Set the clicked icon as highlighted
  };

  return (
    <div className="contact-page">
      {/* Add the ParticlesComponent as a background */}
      <ParticlesComponent id="particles-background" />

      {/* Content that will be displayed over the particles */}
      <div className="contact-container">
        {/* Left Icons */}
        <div className="icons-container">
          <motion.div
            className={`contact-icon ${highlightedIcon === 'email' ? 'highlighted' : ''}`}
            onClick={() => handleIconClick('email')}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </motion.div>
          <motion.div
            className={`contact-icon ${highlightedIcon === 'form' ? 'highlighted' : ''}`}
            onClick={() => handleIconClick('form')}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
          </motion.div>
          <motion.div
            className={`contact-icon ${highlightedIcon === 'phone' ? 'highlighted' : ''}`}
            onClick={() => handleIconClick('phone')}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faPhone} size="2x" />
          </motion.div>
        </div>

        {/* Content Right Side */}
        <div className="contact-content">
          {/* Display the initial message */}
          {activeSection === null && (
            <motion.div
              className="contact-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>How would you like to contact us?</h2>
            </motion.div>
          )}

          {activeSection === 'email' && (
            <motion.div
              className="contact-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>Email Us</h2>
              <p>contact@example.com</p>
            </motion.div>
          )}

          {activeSection === 'form' && (
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>Contact Form</h2>
              <form>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required />
                <button type="submit">Send Message</button>
              </form>
            </motion.div>
          )}

          {activeSection === 'phone' && (
            <motion.div
              className="contact-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2>Call Us!</h2>
              <p>(+1) 234-567-890</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
