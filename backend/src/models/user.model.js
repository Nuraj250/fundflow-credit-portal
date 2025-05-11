/**
 * @file user.model.js
 * @description Mongoose schema for storing authentication credentials.
 * - Stores email, hashed password, and user role.
 * - Supports both 'admin' and 'customer' roles.
 * - Used for login, role-based access control, and JWT generation.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
