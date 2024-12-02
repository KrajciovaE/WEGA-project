const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticateToken = require('../authMiddleware');
const ClimbingSpot = require('../models/ClimbingSpot'); // Cesta k modelu
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Only JPEG, PNG, and GIF files are allowed.'));
    } else {
      cb(null, true);
    }
  },
});

// GET všetky lezecké miesta
router.get('/', async (req, res) => {
  try {
    const spots = await ClimbingSpot.find(); // Načítanie všetkých miest z databázy
    res.status(200).json(spots); // Odoslanie ako JSON odpoveď
  } catch (error) {
    console.error('Chyba pri načítaní miest:', error.message);
    res.status(500).json({ message: 'Vyskytla sa chyba pri načítaní miest.' });
  }
});


// Route to add a climbing spot with an image
router.post('/add', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, location, description, link } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newSpot = new ClimbingSpot({
      name,
      location,
      description,
      image: imagePath,
      link,
      createdBy: req.user.userId,
    });

    const savedSpot = await newSpot.save();
    res.status(201).json({ message: 'Climbing spot added successfully!', spot: savedSpot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while adding the climbing spot.' });
  }
});

// PUT aktualizácia hodnotenia
router.put('/rate/:id', authenticateToken, async (req, res) => {
  try {
    const { rating } = req.body;
    const userId = req.user.userId; // Extract from token

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Hodnotenie musí byť medzi 1 a 5.' });
    }

    // Find the spot
    const spot = await ClimbingSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: 'Miesto nenájdené.' });
    }

    // Check if user has already rated
    const existingRating = spot.ratings.find(r => r.userId.toString() === userId);
    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      spot.ratings.push({ userId, rating });
    }

    await spot.save();
    res.status(200).json({ message: 'Hodnotenie bolo úspešne pridané.', spot });
  } catch (error) {
    console.error('Chyba pri pridávaní hodnotenia:', error.message);
    res.status(500).json({ message: 'Vyskytla sa chyba pri pridávaní hodnotenia.' });
  }
});


// GET endpoint na získanie priemerného hodnotenia
router.get('/:id/average-rating', async (req, res) => {
  try {
    const spot = await ClimbingSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: 'Miesto nenájdené.' });
    }

    const ratings = spot.ratings;
    const averageRating = ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
      : 'Žiadne hodnotenie';

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Chyba pri získavaní priemerného hodnotenia:', error.message);
    res.status(500).json({ message: 'Vyskytla sa chyba pri získavaní hodnotenia.' });
  }
});



// GET jedno lezecké miesto podľa ID
router.get('/:id', async (req, res) => {
  try {
      const id = req.params.id;

      // Validate and convert to ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format' });
      }

      const spot = await ClimbingSpot.findById(id);
      if (!spot) {
          return res.status(404).json({ message: 'Spot not found' });
      }

      res.json(spot);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// DELETE lezecké miesto podľa ID
router.delete('/:id', async (req, res) => {
  try {
    const spot = await ClimbingSpot.findByIdAndDelete(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Miesto nenájdené' });
    res.json({ message: 'Miesto odstránené' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
