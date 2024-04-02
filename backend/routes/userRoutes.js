const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userModel');

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

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      ...req.body,
      password: hashedPassword
    });

    // Save the user
    const savedUser = await newUser.save();

    // Respond to the client
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user. Please try again.' });
  }
});


// User login route
router.post('/login', async (req, res) => {
  try {
    // Find the user by username/email
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return the token and user info
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/clients', async (req, res) => {
  try {
    const users = await User.find({ role: 'client' }); // Only retrieve users with the role 'barber'
    res.status(200).json(users);
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

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Additional routes for barbers and clients can be placed here

module.exports = router;
