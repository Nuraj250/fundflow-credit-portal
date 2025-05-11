/**
 * @file auth.routes.js
 * @description Authentication routes for user registration and login.
 * - POST /api/auth/register → Registers a new user.
 * - POST /api/auth/login → Authenticates a user and returns a JWT.
 * Connected to auth.controller.js for handler logic.
 */

const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
