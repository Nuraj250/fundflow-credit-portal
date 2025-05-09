const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    loanAmount: Number,
    durationMonths: Number,
    purpose: String,
    monthlyIncome: Number,
    existingLoans: Number,
    score: Number,
    status: String,
    recommendation: String
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
