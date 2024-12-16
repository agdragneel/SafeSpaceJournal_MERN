const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage'); // Import the ContactMessage model

// Route to handle saving a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new contact message
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
