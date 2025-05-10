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
