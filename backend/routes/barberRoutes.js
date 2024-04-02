const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Barber = require('../models/barberModel');
const jwt = require("jsonwebtoken");


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
router.post('/login', async (req, res) => {
    try {
        // Find the user by username/email
        const barber = await Barber.findOne({ username: req.body.username });
        if (!barber) {
            return res.status(404).json({ message: "Barber not found" });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, barber.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: barber._id, role: barber.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Return the token and user info
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: barber._id,
                username: barber.username,
                email: barber.email,
                phone: barber.phone,
                firstName: barber.firstName,
                lastName: barber.lastName,
                role: barber.role
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;