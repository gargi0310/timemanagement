const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  day: String,
  slot: String,
  subject: String
});

const timetableSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
    unique: true
  },
  entries: [entrySchema]
});

module.exports = mongoose.model('Timetable', timetableSchema);