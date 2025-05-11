/**
 * @file loan.routes.js
 * @description API routes for managing loan applications.
 * - Protected via `authMiddleware` to allow only authenticated users.
 * Endpoints:
 * - POST /api/loans → Create a new loan (customer or admin logic applies)
 * - GET /api/loans → Fetch all loans (for dashboards)
 * - PUT /api/loans/:id → Update loan info (admin use)
 * - DELETE /api/loans/:id → Delete a loan (admin use)
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const {
    createLoan,
    getLoans,
    updateLoan,
    deleteLoan,
} = require('../controllers/loan.controller');

router.post('/', authMiddleware, createLoan);
router.get('/', authMiddleware, getLoans);
router.put('/:id', authMiddleware, updateLoan);
router.delete('/:id', authMiddleware, deleteLoan);

module.exports = router;
