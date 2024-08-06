const express = require('express');
const { Sale, Product } = require('../models');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to authenticate JWT

const router = express.Router();

// Get sales data for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      where: { userId: req.user.userId },
      include: [{ model: Product }]
    });

    const totalEarnings = sales.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
    const recentTransactions = sales.map(sale => ({
      productName: sale.Product.name,
      amount: sale.amount,
      date: sale.date
    }));

    res.json({ totalEarnings, recentTransactions });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;