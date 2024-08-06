const express = require('express');
const { Message } = require('../models');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate JWT

const router = express.Router();

// Get messages for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { userId: req.user.userId } });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;