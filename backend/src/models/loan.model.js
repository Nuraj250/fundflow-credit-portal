const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        loanAmount: {
            type: Number,
            required: true,
        },
        durationMonths: {
            type: Number,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        monthlyIncome: {
            type: Number,
            required: true,
        },
        existingLoans: {
            type: Number,
            default: 0,
        },
        creditScore: {
            type: Number,
            default: null,
        },
        score: {
            type: Number,
            default: null,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'], // ✅ lowercase
            default: 'pending',
        },
        recommendation: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);
