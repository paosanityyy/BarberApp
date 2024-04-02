const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber', required: true },
    service: { type: String, enum: ['Haircut', 'Haircut + Beard', 'Braids'], default: 'Haircut' },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);