const express = require('express');
const bcrypt = require('bcrypt');
const Barber = require('../models/barberModel');

const router = express.Router();

// Create a new barber
router.post('/add', async (req, res) => {
  try {
    // Extract barber data from the request body
    const { firstName, lastName, email, phoneNumber, username, password } = req.body;
    // Check if a barber with the same username or email already exists
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingBarber = await Barber.findOne({ $or: [{ username }, { email }] });

    if (existingBarber) {
      // Barber with the same username or email already exists
      return res.status(400).json({ success: false, message: 'Username or email already in use' });
    }

    // Create a new barber using the Barber model
    const newBarber = new Barber({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
    });

    // Save the barber to the database
    const savedBarber = await newBarber.save();

    // Successful signup
    res.status(201).json({ message: "Barber registered successfully", barber: savedBarber });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Error registering barber' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const barber = await Barber.findOne({ username, password });

    if (!barber) {
        return res.status(401).json({ status: false, message: 'Invalid Username and Password' });
    }
    if (barber.password !== password) {
    res.status(401).json({ status: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ 
        status: true, 
        message: 'Login successful', 
        username: barber.username 
    });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Error logging in barber' });
    }
});

// Get all barbers
router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting barbers' });
  }
});

// Get a specific barber
router.get('/update/:id', async (req, res) => {

  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.status(200).json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting barber' });
  }
});

// Update a specific barber
router.put('/employees/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, username, password } = req.body;
    const updatedBarber = await Barber.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedBarber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.status(200).json(updatedBarber);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating barber' });
    }
});

// Delete a specific barber
router.delete('/:id', async (req, res) => {
  try {
    const deletedBarber = await Barber.findByIdAndDelete(req.params.id);
    if (!deletedBarber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.status(200).json(deletedBarber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting barber' });
  }
});

module.exports = router;
        