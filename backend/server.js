const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const barberRoutes = require('./routes/barberRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');


// Connect to MongoDB
const DB_HOST = "cluster0.3myz13n.mongodb.net";
const DB_NAME = "CentralStudios";
const DB_USER = "paolocasison";
const DB_PASS = "Password.123";
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error', error);
});

// Middleware to parse JSON in the request body
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/appointments', appointmentRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
