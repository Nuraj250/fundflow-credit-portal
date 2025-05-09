const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    NIC: String,
    email: String,
    monthlyIncome: Number,
    creditScore: Number
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
