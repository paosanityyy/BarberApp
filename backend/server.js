// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import the User model
const User = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://allanissumaya22:Allanismongopass22@cluster0.zap8277.mongodb.net/BarberAppProject?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  // Extract user data from the request body
  const { firstName, lastName, phoneNumber, email, username, password } = req.body;

  try {
    // Check if a user with the same username or email already exists
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
    await newUser.save();

    // Successful signup
    res.json({ success: true, user: newUser });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Successful login
      res.json({ success: true, user });
    } else {
      // Incorrect username or password
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ... (your existing code)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
