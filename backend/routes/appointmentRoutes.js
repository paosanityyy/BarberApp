const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// Schedule an appointment
router.post('/', async (req, res) => {
    try {
        const { barberId } = req.body;

        // First, find the user by the provided barberId to verify their role
        const barber = await User.findById(barberId);

        // If no user is found with the barberId, or the user is not a barber, return an error
        if (!barber || barber.role !== 'barber') {
            return res.status(400).json({ message: 'Invalid barber ID or the user is not a barber.' });
        }

        // If the validation passes, proceed to create the appointment
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json({ savedAppointment, message: 'Appointment scheduled successfully' });
    } catch (err) {
        console.error(err); // It's a good practice to log the error for debugging
        res.status(500).json({ message: 'An error occurred while scheduling the appointment.', error: err.toString() });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get appointments for a barber
router.get('/barber/:barberId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ barberId: req.params.barberId });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get appointments for a client
router.get('/client/:clientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ clientId: req.params.clientId });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
