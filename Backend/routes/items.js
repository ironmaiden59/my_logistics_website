const express = require('express');
const crypto = require('crypto');
const { Token, Item, User } = require('../models'); // Import both Item and User models
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Generate a unique token and send a link to the seller
router.get('/:id/generate-link', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const buyerId = req.user.userId; // JWT decoded userId

  console.log('Generating link for item:', id, 'by buyer:', buyerId); // Debugging log

  if (!buyerId) {
    return res.status(401).json({ message: 'Unauthorized: Buyer must be logged in.' });
  }

  try {
    // Generate a unique token for temporary access
    const token = crypto.randomBytes(20).toString('hex');

    // Store the token along with the itemId and buyerId
    await Token.create({ token, itemId: id, buyerId });

    // Send the generated link back to the frontend
    res.json({ link: `http://localhost:3000/respond-to-buyer/${id}?token=${token}` });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
  let { name, price } = req.body;

  // Ensure the price is numeric
  price = parseFloat(price);
  if (isNaN(price)) {
    return res.status(400).json({ message: 'Invalid price format' });
  }

  // You can set a default userId, for example, representing "system" or "admin" user
  const userId = 1; // Default userId for items created via the Chrome extension

  try {
    const item = await Item.create({ name, price, userId }); // Use default userId here
    res.status(201).json(item);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single item by ID, including seller (user) info
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [
        {
          model: User, 
          as: 'seller', 
          attributes: ['id', 'firstName', 'lastName', 'email'] // Use firstName and lastName instead of name
        }
      ]
    });

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