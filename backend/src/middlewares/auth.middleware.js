/**
 * @file authMiddleware.js
 * @description Express middleware to verify JWT tokens and authorize requests.
 * - Extracts the token from the Authorization header.
 * - Verifies and decodes it using the JWT secret.
 * - Attaches user info (id, email, role) to `req.user` for downstream use.
 * Used to protect routes like `/api/loans`, `/api/customers`, etc.
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
