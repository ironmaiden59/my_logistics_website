const express = require('express');
const { Item } = require('../models');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new item (used by the Chrome extension)
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  try {
    const item = await Item.create({ name, price });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;