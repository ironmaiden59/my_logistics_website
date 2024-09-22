const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { User } = require('../models');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Error fetching user information.' });
  }
});

module.exports = router;