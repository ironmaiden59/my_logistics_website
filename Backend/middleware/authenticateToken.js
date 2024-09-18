const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer token'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; // Attach userId to request object
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;