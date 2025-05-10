const express = require('express');
const router = express.Router();
const { createLoan, getLoans, updateLoan, deleteLoan } = require('../controllers/loan.controller');

router.post('/', createLoan);
router.get('/', getLoans);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

module.exports = router;
