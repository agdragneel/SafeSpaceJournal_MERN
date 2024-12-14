const express = require('express');
const Journal = require('../models/Journal');  // Import the Journal model
const authMiddleware = require('../middleware/authMiddleware');  // Import authentication middleware
const router = express.Router();

// Add Journal Entry
router.post('/entries', authMiddleware, async (req, res) => {
  const { heading, entryText } = req.body;
  const userId = req.user.userId;  // Get the userId from the JWT token
  const createdBy = req.user.email;  // Get the user's username from JWT (assuming it's in the payload)

  if (!heading || !entryText) {
    return res.status(400).json({ message: 'Heading and entry text are required' });
  }

  // Create and save the new journal entry
  const journalEntry = new Journal({ userId, heading, entryText, createdBy });
  await journalEntry.save();

  res.status(201).json({ message: 'Journal entry saved' });
});

// Get all Journal Entries for a user
router.get('/entries', authMiddleware, async (req, res) => {
  const userId = req.user.userId;  // Get the userId from the JWT token

  const entries = await Journal.find({ userId });

  res.status(200).json({ entries });
});

module.exports = router;
