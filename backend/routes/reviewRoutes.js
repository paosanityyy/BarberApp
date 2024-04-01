const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

// Create a review
router.post('/', async (req, res) => {
    try {
        const { barberId } = req.body;

        // First, find the user by the provided barberId to verify their role
        const barber = await User.findById(barberId);

        // If no user is found with the barberId, or the user is not a barber, return an error
        if (!barber || barber.role !== 'barber') {
            return res.status(400).json({ message: 'Invalid barber ID or the user is not a barber.' });
        }

        // If the validation passes, proceed to create the review
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json({ savedReview, message: 'Review created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the review.', error: err.toString() });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('clientId', 'firstName')
            .populate('barberId', 'firstName')
            .exec();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get reviews for a barber
router.get('/barber/:barberId', async (req, res) => {
    try {
        const reviews = await Review.find({ barberId: req.params.barberId });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;