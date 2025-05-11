/**
 * @file jwt.js
 * @description Utility functions for handling JWT operations.
 * - `generateToken(user)`: Creates a signed JWT with user email and role, valid for 7 days.
 * - `verifyToken(token)`: Verifies and decodes the JWT using the secret.
 * Used in authentication middleware and login responses.
 */

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
