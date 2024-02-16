const mongoose = require('mongoose');
const User = require('./userModel');
const Barber = require('./barberModel');

var appointmentSchema = new mongoose.Schema({
    // barber name, service, date, time, client name, client phone, client email
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Barber, 
        required: true
    },
    service: {
        type: String,
        required: [true, 'Service is required'],
        enum: ['Haircut', 'Haircut & Beard', 'Braid']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    // 12:00 PM - 7:00 PM 1 hour intervals
    time: {
        type: String,
        required: [true, 'Time is required'],
        enum: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;