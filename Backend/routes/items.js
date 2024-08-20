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

// Add a new item (used by the Chrome extension)
router.post('/', async (req, res) => {
  let { name, price } = req.body;

  // Ensure the price is numeric
  price = parseFloat(price);
  if (isNaN(price)) {
    return res.status(400).json({ message: 'Invalid price format' });
  }

  try {
    const item = await Item.create({ name, price });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;