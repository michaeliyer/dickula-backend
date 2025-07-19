const express = require('express');
const router = express.Router();
const Cocktail = require('../models/Cocktail');

// Get all cocktails
router.get('/', async (req, res) => {
  const cocktails = await Cocktail.find();
  res.json(cocktails);
});

// Create a new cocktail
router.post('/', async (req, res) => {
  try {
    const cocktail = new Cocktail(req.body);
    await cocktail.save();
    res.status(201).json(cocktail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a cocktail
router.put('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cocktail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a cocktail
router.delete('/:id', async (req, res) => {
  try {
    await Cocktail.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;