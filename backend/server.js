require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const climbingSpotsRouter = require('./routes/climbingSpots');
const authRouter = require('./routes/auth');

const app = express();

// Povolenie CORS
app.use(cors({ origin: 'http://localhost:4200' }));

// Nastavenie statického priečinka pre obrázky
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use(express.json());
app.use('/api/climbingSpots', climbingSpotsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server beží na porte ${PORT}`));

// Pripojenie k MongoDB
mongoose.connect('mongodb://localhost:27017/climbingSpots')
  .then(() => console.log('MongoDB pripojený...'))
  .catch(err => console.log(err));
