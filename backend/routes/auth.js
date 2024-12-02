const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registrácia
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kontrola, či už existuje používateľ s daným e-mailom alebo používateľským menom
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email už existuje.' });
    }

    // Hashovanie hesla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vytvorenie nového používateľa
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Uloženie používateľa do databázy
    await newUser.save();

    res.status(201).json({ message: 'Registrácia úspešná!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Vyskytla sa chyba pri registrácii.' });
  }
});

// Prihlasovanie
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Skontrolujeme, či používateľ existuje
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Nesprávny email alebo heslo.' });
      }
  
      // Overíme heslo
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Nesprávny email alebo heslo.' });
      }
  
      // Vygenerujeme JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET, // Použitie tajného kľúča z prostredia
        { expiresIn: '1h' }
      );
      
      // Pošleme token používateľovi
      res.json({ token, message: 'Prihlásenie úspešné!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Vyskytla sa chyba pri prihlasovaní.' });
    }
  });

module.exports = router;
