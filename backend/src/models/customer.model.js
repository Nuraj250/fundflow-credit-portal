const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  name: String,
  nic: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  income: Number,
  creditScore: Number,
  role: { type: String, default: 'customer' }
});

// ✅ Pre-save hook to hash password
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Customer', customerSchema);
