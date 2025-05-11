/**
 * @file auth.controller.js
 * @description Handles user authentication logic including register and login.
 * Uses bcrypt for password hashing and custom JWT utility for token generation.
 * This controller is used in the `/api/auth` route to manage user sessions.
 */

const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });
    res.json({ token: generateToken(user) });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({
        token: generateToken(user),
        role: user.role,
        name: user.name,
        id: user._id
    });
};

module.exports = { register, login };
