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

// Set up multer to handle multiple images
const upload = multer({ storage }).array('images', 10); // Allow up to 10 images

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

// Add a new product with multiple images
router.post('/', authenticateToken, upload, async (req, res) => {
  const { name, price, description } = req.body;
  const imageUrls = req.files.map(file => file.path); // Store paths of all uploaded images

  try {
    const product = await Product.create({
      name,
      price,
      description,
      images: imageUrls, // Store array of image URLs
      userId: req.user.userId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id, userId: req.user.userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Modify image URLs to serve them correctly
    const productData = product.toJSON();
    productData.images = productData.images.map(imageUrl => imageUrl.replace('uploads/', '/uploads/'));

    res.json(productData);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product with multiple image uploads
router.put('/:id', authenticateToken, upload, async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const imageUrls = req.files.map(file => file.path);

  try {
    const product = await Product.findOne({ where: { id, userId: req.user.userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    if (imageUrls.length > 0) {
      product.images = imageUrls; // Replace existing images with new ones
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