const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/userModel');

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, username, email, phone, role, password } = req.body;
        // Inside your signup route
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username or email already exists"});
        }

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            phone,
            role,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({message: "User created successfully", user: savedUser});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user. Please try again.'});
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the password doesn't match, return an invalid password error
            return res.status(400).json({ message: "Invalid password", });
        }

        // If password matches, proceed to generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Return the token and user info
        res.status(200).json({ status: true, message: 'Login successful', user, token });
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

// Get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
            { new: true } // This option returns the document after update was applied.
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


module.exports = router;
