const express = require('express');
const { Product } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');


const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer with storage engine
const upload = multer({ storage });

// Get all products for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  console.log('Authenticated user:', req.user); // Add logging to verify user

  const { name, price, description } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  try {
    const products = await Product.findAll({ where: { userId: req.user.userId } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product with image upload
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl, // Save the image URL
      userId: req.user.userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  try {
    const product = await Product.findOne({ where: { id, userId: req.user.userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    
    // Update the image if a new one was uploaded
    if (imageUrl) {
      product.imageUrl = imageUrl;
    }

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
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