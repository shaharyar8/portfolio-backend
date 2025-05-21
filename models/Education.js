const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Please add a degree name'],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, 'Please add an institution name'],
    trim: true,
  },
  year: {
    type: String,
    required: [true, 'Please add study years'],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Education', EducationSchema);