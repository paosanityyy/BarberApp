const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Barber = require('../models/barberModel');


// Get all users with the role 'barber'
router.get('/', async (req, res) => {
    try {
        const users = await Barber.find({ role: 'barber' }); // Only retrieve users with the role 'barber'
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/createBarber', async (req, res) => {
    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user with the hashed password
        const newUser = new Barber({
            ...req.body,
            password: hashedPassword
        });

        // Save the user
        const savedUser = await newUser.save();

        // Respond to the client
        res.status(201).json({ message: "Barber created successfully", user: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering barber. Please try again.' });
    }
});

module.exports = router;