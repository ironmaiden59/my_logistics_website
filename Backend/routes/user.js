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

router.post('/associate-item', authenticateToken, async (req, res) => {
  const { itemId } = req.body;
  const sellerId = req.user.userId;

  try {
    // Find the item by ID
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }


    // Associate the item with the seller
    item.userId = sellerId;
    await item.save();

    res.json({ message: 'Item associated with seller successfully' });
  } catch (error) {
    console.error('Error associating item with seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;