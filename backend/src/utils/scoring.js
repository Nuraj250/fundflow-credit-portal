/**
 * @file scoring.js
 * @description Business logic for loan credit scoring and approval.
 * - `calculateScore(loan)`: Computes a credit score based on loan data.
 * - `getStatus(score)`: Returns 'Approved' or 'Rejected' based on score.
 * Used in loan creation to assess financial eligibility.
 */

const calculateScore = (loan) => {
    let score = 50;

    const emi = loan.loanAmount / loan.durationMonths;
    if (emi <= loan.monthlyIncome * 0.4) score += 20;
    if (loan.existingLoans <= 2) score += 10;
    if (loan.loanAmount < 500000) score += 10;
    if (loan.creditScore > 700) score += 10;

    return score;
};

const getStatus = (score) => {
    return score >= 70 ? 'Approved' : 'Rejected';
};

module.exports = { calculateScore, getStatus };
