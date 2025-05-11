const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    enum: ['Arts', 'Aurveda', 'BBA', 'BCA', 'Commerce', 'Hotel Management', 'Law', 'Mass Media', 'MCA', 'Physiotherapy', 'Yoga', 'Other']
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Professor', 'Student']
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
