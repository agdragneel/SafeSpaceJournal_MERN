import React, { useState } from 'react';
import ParticlesComponent from '../components/Particles'; // Import the Particles component
import './ContactPage.css'; // Import custom CSS for the page
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios for making HTTP requests

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
  const [error, setError] = useState(''); // Error state to capture submission errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5001/api/contact', formData);
      alert(response.data.message); // Show success message from backend
      setFormData({ name: '', email: '', message: '' }); // Reset the form
    } catch (err) {
      // Handle any errors
      setError('There was an error submitting your message. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="contact-page">
      {/* Add the ParticlesComponent as a background */}
      <ParticlesComponent id="particles-background" />

      {/* Content that will be displayed over the particles */}
      <div className="contact-form-container">
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          Contact Us
        </motion.h2>

        {/* Display error message if there is one */}
        {error && <p className="error-message">{error}</p>}

        <motion.form
          onSubmit={handleSubmit}
          className="contact-form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
