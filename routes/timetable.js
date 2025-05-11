// routes/timetable.js
const express = require('express');
const router = express.Router();
const Timetable = require('./models/Timetable');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/timetable', async (req, res) => {
  try {
    const { timetable } = req.body;

    if (!Array.isArray(timetable)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    await Timetable.insertMany(timetable);
    res.status(201).json({ message: 'Timetable saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save timetable' });
  }
});

router.post('/submit', ensureAuthenticated, async (req, res) => {
  try {
    const { semester, timetable } = req.body;
    const user = req.user;

    const newTimetable = new Timetable({
      professorId: user._id,
      name: user.name,
      department: user.department,
      semester,
      timetable
    });

    await newTimetable.save();
    res.status(200).json({ success: true, message: 'Timetable saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
