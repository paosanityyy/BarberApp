const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin', 'barber'], default: 'client' },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
