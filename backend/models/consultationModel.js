const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  fullName: { type: String, required: true},
  email: { type: String, required: true},
  subject: { type: String, required: true},
  message: { type: String, required: true},
  createdAt: { type: Date, default: Date.now}
});

module.exports  = mongoose.model('Consultation', consultationSchema);


