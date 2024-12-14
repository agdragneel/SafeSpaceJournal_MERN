const mongoose = require('mongoose');

// Journal Entry Schema
const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  heading: { type: String, required: true },
  entryText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true } // Ensure createdBy is stored
});

module.exports = mongoose.model('Journal', journalSchema);
