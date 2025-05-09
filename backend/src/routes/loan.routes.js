const express = require('express');
const { applyLoan, getLoans } = require('../controllers/loan.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', applyLoan);
router.get('/', getLoans);

module.exports = router;
