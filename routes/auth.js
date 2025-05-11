const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');




router.post('/signup', async (req, res) => {
    console.log("Auth routes loaded");
  const { department, role, name, surname, email, phone, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send('Email or Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      department,
      role,
      name,
      surname,
      email,
      phone,
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/'); // or wherever you want to redirect after signup
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post('/login', async (req, res) => {
    const { department, role, username, password } = req.body;
  
    try {
      const user = await User.findOne({ department, role, username });
  
      if (!user) {
        return res.status(401).send('Invalid credentials');
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send('Incorrect password');
      }
  
      
      if (user.role === 'Admin') {
        return res.redirect(`/admin/dashboard?user=${user.username}&dept=${user.department}`);
      } else if (user.role === 'Professor') {
        return res.redirect(`/professor/dashboard?user=${user.username}&dept=${user.department}`);
      } else if (user.role === 'Student') {
        return res.redirect(`/student/dashboard?user=${user.username}`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;
  // Redirect based on role
  