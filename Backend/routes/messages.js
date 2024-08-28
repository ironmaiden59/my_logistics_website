const express = require('express');
const { Message } = require('../models');
const router = express.Router();

// Get messages for a specific item
router.get('/item/:itemId', async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { itemId: req.params.itemId } });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  const { content, senderId, receiverId, itemId } = req.body;

  try {
    const message = await Message.create({ content, senderId, receiverId, itemId });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;