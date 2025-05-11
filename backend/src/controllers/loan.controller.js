/**
 * @file loan.controller.js
 * @description Manages loan creation, retrieval, updating, and deletion.
 * - Calculates credit score and evaluates loan approval status.
 * - Admins can approve/reject loans based on score; customers' loans go into "pending".
 * - Loan entries are logged to MongoDB for audit using a custom logger.
 * Used in `/api/loans` route and secured via auth middleware.
 */

const Loan = require('../models/loan.model');
const Customer = require('../models/customer.model');
const { calculateScore, getStatus } = require('../utils/scoring');
const logLoanRequest = require('../logs/mongodb.logger');

// Create Loan (admin or customer)
const createLoan = async (req, res) => {
    try {
        const {
            loanAmount,
            durationMonths,
            purpose,
            monthlyIncome,
            existingLoans,
            customerId: inputCustomerId,
        } = req.body;

        const userEmail = req.user?.email;
        const userRole = req.user?.role;

        const customer = userRole === 'admin'
            ? await Customer.findById(inputCustomerId)
            : await Customer.findOne({ email: userEmail });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const creditScore = customer.creditScore || 0;

        const loanData = {
            customerId: customer._id,
            loanAmount,
            durationMonths,
            purpose,
            monthlyIncome,
            existingLoans,
            creditScore,
        };

        const score = calculateScore(loanData);
        const isAdmin = userRole === 'admin';

        const status = isAdmin ? (score > 60 ? 'approved' : 'rejected') : 'pending';

        const recommendation = isAdmin
            ? status === 'approved'
                ? `Eligible for ${durationMonths}-month loan at 14% interest`
                : 'Loan rejected. Improve financial profile.'
            : 'Awaiting admin review';

        const loan = await Loan.create({
            ...loanData,
            score,
            status,
            recommendation,
        });

        await logLoanRequest(customer._id, req.body, score, status);

        res.status(201).json(loan);
    } catch (err) {
        console.error('Loan creation failed:', err.message);
        res.status(500).json({ message: 'Loan creation failed' });
    }
};

// Get all loans
const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('customerId', 'name email');
        res.json(loans);
    } catch (err) {
        res.status(500).json({ message: 'Fetching loans failed' });
    }
};

// Update a loan
const updateLoan = async (req, res) => {
    try {
        const updated = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Loan not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Loan update failed' });
    }
};

// Delete a loan
const deleteLoan = async (req, res) => {
    try {
        const deleted = await Loan.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Loan not found' });
        res.json({ message: 'Loan deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Loan deletion failed' });
    }
};

module.exports = {
    createLoan,
    getLoans,
    updateLoan,
    deleteLoan,
};
