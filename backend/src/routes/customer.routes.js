/**
 * @file customer.routes.js
 * @description Protected routes for managing customer records (Admin only).
 * Middleware:
 * - Requires valid JWT (authMiddleware).
 * - Requires admin role (roleMiddleware).
 * Endpoints:
 * - POST /api/customers → Create a new customer
 * - GET /api/customers → Retrieve all customers
 * - PUT /api/customers/:id → Update customer by ID
 * - DELETE /api/customers/:id → Delete customer by ID
 */

const express = require('express');
const {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer.controller');

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
