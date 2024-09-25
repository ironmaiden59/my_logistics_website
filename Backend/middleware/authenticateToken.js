const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader:', authHeader); // Log the Authorization header
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token); // Log the extracted token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Error verifying token:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};

module.exports = authenticateToken;