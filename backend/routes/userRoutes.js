const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
    try {
      // Extract user data from the request body
      const { firstName, lastName, phoneNumber, email, username, password } = req.body;
      // Check if a user with the same username or email already exists
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        // User with the same username or email already exists
        return res.status(400).json({ success: false, message: 'Username or email already in use' });
      }
  
      // Create a new user using the User model
      const newUser = new User({
        firstName,
        lastName,
        phoneNumber,
        email,
        username,
        password,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      // Successful signup
      res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
});
  
// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user) {
          return res.status(401).json({ status: false, message: 'Invalid Username and Password' });
        }
        if (user.password !== password) {
        res.status(401).json({ status: false, message: 'Invalid credentials' });
        }

        res.status(200).json({ 
            status: true, 
            message: 'Login successful', 
            username: user.username 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
