const express = require('express');
const { Product } = require('../models');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate JWT

const router = express.Router();

// Get all products for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll({ where: { userId: req.user.userId } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product
router.post('/', authenticateToken, async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      userId: req.user.userId
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id, userId: req.user.userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;