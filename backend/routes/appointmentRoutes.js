const express = require('express');
const router = express.Router();


const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
});

// Get a specific appointment
router.get('/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching appointment" });
    }
});

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { barber, service, date, time, client } = req.body;
        const newAppointment = new Appointment({ barber, service, date, time, client });
        const savedAppointment = await newAppointment.save();
        res.status(201).json({ message: "Appointment created", appointment: savedAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating appointment" });
    }
});

// Update an appointment
router.put('/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    try {
        const { barber, service, date, time, client, status } = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId, 
            { barber, service, date, time, client, status }, 
            { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment updated", appointment: updatedAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating appointment" });
    }
});

// Delete an appointment
router.delete('/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment deleted", appointment: deletedAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting appointment" });
    }
});

module.exports = router;
    
