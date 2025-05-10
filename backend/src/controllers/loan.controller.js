const Loan = require('../models/loan.model');
const Customer = require('../models/customer.model');
const { calculateScore, getStatus } = require('../utils/scoring');
const logLoanRequest = require('../logs/mongodb.logger');

// Admin or system-based loan creation
const createLoan = async (req, res) => {
    try {
        const {
            customerId,
            loanAmount,
            durationMonths,
            purpose,
            monthlyIncome,
            existingLoans,
        } = req.body;

        if (!customerId || !loanAmount || !durationMonths || !purpose || !monthlyIncome) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const loanData = {
            customerId,
            loanAmount: Number(loanAmount),
            durationMonths: Number(durationMonths),
            purpose,
            monthlyIncome: Number(monthlyIncome),
            existingLoans: Number(existingLoans),
            creditScore: customer.creditScore,
        };

        const score = calculateScore(loanData);
        const status = getStatus(score).toLowerCase();

        const recommendation =
            status === 'approved'
                ? `Eligible for ${durationMonths}-month loan at 14% interest`
                : 'Loan Rejected. Improve financial profile.';

        const loan = await Loan.create({
            ...loanData,
            score,
            status,
            recommendation,
        });

        await logLoanRequest(customerId, req.body, score, status);

        res.status(201).json({ score, status, recommendation, loan });
    } catch (error) {
        console.error('Loan creation failed:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('customerId', 'name email');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch loans' });
    }
};

const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndUpdate(id, req.body, { new: true });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json(loan);
  } catch (error) {
    console.error('Loan update failed:', error.message);
    res.status(500).json({ message: 'Failed to update loan' });
  }
};

const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByIdAndDelete(id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Loan deletion failed:', error.message);
    res.status(500).json({ message: 'Failed to delete loan' });
  }
};

module.exports = { createLoan, getLoans, updateLoan, deleteLoan };
