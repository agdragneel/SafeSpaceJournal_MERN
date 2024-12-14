const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Import User model
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const user = new User({ firstName, lastName, dateOfBirth, email, password });

  // Save the user to the database
  await user.save();

  // Create a JWT token (with user ID)
  const token = jwt.sign(
    { userId: user._id, email: user.email },  // Include email
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(201).json({ message: 'User registered successfully', token });
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Create a JWT token (with user ID)
    const token = jwt.sign(
      { userId: user._id, email: user.email },  // Include email
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    res.status(200).json({ message: 'Login successful', token });
  });

module.exports = router;
