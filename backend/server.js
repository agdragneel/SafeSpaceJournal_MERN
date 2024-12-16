const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const contactMessageRoutes = require('./routes/contactMessageRoutes'); // Import the ContactMessage routes

dotenv.config();  // To load environment variables from .env file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());  // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the process if DB connection fails
  });

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/contact', contactMessageRoutes); // Add the contact message route

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
