const express = require('express');
const { Delivery, Product } = require('../models');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate JWT

const router = express.Router();

// Get delivery data for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const deliveries = await Delivery.findAll({
      include: [{ model: Product, where: { userId: req.user.userId } }]
    });

    const deliveryData = deliveries.map(delivery => ({
      productName: delivery.Product.name,
      status: delivery.status,
      estimatedDelivery: delivery.estimatedDelivery
    }));

    res.json(deliveryData);
  } catch (error) {
    console.error('Error fetching delivery data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;