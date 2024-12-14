const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user schema with additional fields
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Make first name a required field
  },
  lastName: {
    type: String,
    required: true, // Make last name a required field
  },
  dateOfBirth: {
    type: Date,
    required: true, // Make date of birth a required field
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
