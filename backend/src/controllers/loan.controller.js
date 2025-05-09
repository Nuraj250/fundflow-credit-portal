const Loan = require('../models/loan.model');
const Customer = require('../models/customer.model');
const { calculateScore, getStatus } = require('../utils/scoring');
const logLoanRequest = require('../logs/mongodb.logger');


const applyLoan = async (req, res) => {
    await logLoanRequest(customer._id, req.body, score, status);
    const { loanAmount, durationMonths, purpose, monthlyIncome, existingLoans } = req.body;
    const customer = await Customer.findOne({ email: req.user.email });

    const loanData = {
        customerId: customer._id,
        loanAmount,
        durationMonths,
        purpose,
        monthlyIncome,
        existingLoans,
        creditScore: customer.creditScore
    };

    const score = calculateScore(loanData);
    const status = getStatus(score);

    const recommendation = status === 'Approved'
        ? `Eligible for ${durationMonths}-month loan at 14% interest`
        : 'Loan Rejected. Improve financial profile.';

    const loan = await Loan.create({
        ...loanData,
        score,
        status,
        recommendation
    });

    res.json({ score, status, recommendation });
};

const getLoans = async (req, res) => {
    const loans = await Loan.find().populate('customerId', 'name email');
    res.json(loans);
};

module.exports = { applyLoan, getLoans };
