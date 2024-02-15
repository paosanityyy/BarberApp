const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const barberRoutes = require('./routes/barberRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');


// Connect to MongoDB
mongoose.connect('mongodb+srv://allanissumaya22:Allanismongopass22@cluster0.zap8277.mongodb.net/BarberAppProject?retryWrites=true&w=majority', {
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
