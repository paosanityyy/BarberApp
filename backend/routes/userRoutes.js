require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/userModel');

// Ensure MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all barbers
router.get('/barbers', async (req, res) => {
  try {
    const barbers = await User.find({ role: 'barber' });
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' });
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get logged in profile
router.get('/profile', async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
        if (err) throw err;
        const { _id, firstName, lastName, email, phone, username } = await User.findById(userData.id);
        res.json({ _id, firstName, lastName, email, phone, username });
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

const bcryptSalt = bcrypt.genSaltSync(10);

// Create a new user
router.post('/register', async (req, res) => {
  const { username, email, phone, firstName, lastName, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      phone,
      firstName,
      lastName,
      role: 'client',
      password: bcrypt.hashSync(password, bcryptSalt)
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user. Please try again.' });
  }
});

// Create a new barber
router.post('/create-barber', async (req, res) => {
  const { username, email, phone, firstName, lastName, password } = req.body;
  try {
    const barber = await User.create({
      username,
      email,
      phone,
      firstName,
      lastName,
      role: 'barber',
      password: bcrypt.hashSync(password, bcryptSalt)
    });
    res.status(201).json({ message: "Barber created successfully", barber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering barber. Please try again.' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try { 
    const user = await User.findOne({ username });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user);
          }
        );
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { token } = req.cookies;
  const { username, email, phone, firstName, lastName } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
    if (err) throw err;
    try {
      const updatedUser = await User.findByIdAndUpdate(userData.id, {
        username, email, phone, firstName, lastName
      }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user data' });
    }
  });
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
