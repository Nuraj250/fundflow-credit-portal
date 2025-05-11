/**
 * @file loan.model.js
 * @description Mongoose schema for storing loan applications.
 * - References the `Customer` model via `customerId`.
 * - Contains all financial and decision-related fields: income, score, status, etc.
 * - Uses timestamps to track creation and update times.
 * Used in loan processing, credit scoring, and CRUD operations.
 */

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
            enum: ['pending', 'approved', 'rejected'], // lowercase enforced
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
