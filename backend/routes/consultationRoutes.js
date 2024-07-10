const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Consultation = require('../models/consultationModel');

// Route to handle creating a new consultation
router.post('/', async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;
    const consultation = new Consultation({ fullName, email, subject, message });
    await consultation.save();
    res.status(201).json({ message: 'Consultation saved successfully' });

    //Return the token and consultation info
    // res.status(200).json({
    //   message: 'Submission successful',
    //   consultation: {
    //     fullName: consultation.fullName,
    //     email: user.email,
    //     subject: consultation.subject,
    //     message: consultation.message,
    //   },
    //   token
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all consultations
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


