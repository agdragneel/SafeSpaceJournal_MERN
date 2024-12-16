const mongoose = require('mongoose');

// Contact Message Schema
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Track when the message was sent
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
