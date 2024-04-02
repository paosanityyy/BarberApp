require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const barberRoutes = require('./routes/barberRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/appointments', appointmentRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Barbershop Backend');
});

//Start Server
server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
