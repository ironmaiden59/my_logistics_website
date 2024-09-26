const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { Token, Item } = require('../models');
const { Message } = require('../models');
const router = express.Router();

// Get all messages for a specific item
router.get('/item/:itemId', authenticateToken, async (req, res) => {
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
router.post('/', authenticateToken, async (req, res) => {
  const { content, senderId, receiverId, itemId, senderName } = req.body;

  // Validate that all required fields are present
  if (!content || !senderId || !receiverId || !itemId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newMessage = await Message.create({
      content,
      senderId,
      receiverId,
      itemId,
      senderName: senderName || 'Anonymous',
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate the token when seller clicks the link
router.post('/validate-token', async (req, res) => {
  const { token } = req.body;

  // Debugging: Log the received token
  console.log('Received token for validation:', token);

  try {
    // Find the token in the database
    const validToken = await Token.findOne({ where: { token }, include: [Item] });

    if (validToken) {
      res.json({ valid: true, item: validToken.Item, buyerId: validToken.buyerId });
    } else {
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;