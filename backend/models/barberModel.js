const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    },
});

const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;