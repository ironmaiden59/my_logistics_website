const express = require('express');
const { Message } = require('../models');
const router = express.Router();

// Get all messages for a specific item
router.get('/item/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { itemId },
      order: [['createdAt', 'ASC']], // Show messages in ascending order
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  const { content, senderId, receiverId, itemId } = req.body;

  try {
    const newMessage = await Message.create({
      content,
      senderId,
      receiverId,
      itemId,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;