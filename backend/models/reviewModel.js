const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String },
    rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
