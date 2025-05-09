const express = require('express');
const { createCustomer, getAllCustomers, updateCustomer, deleteCustomer } = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
