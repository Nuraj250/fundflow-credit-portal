const Customer = require('../models/customer.model');

const createCustomer = async (req, res) => {
    const creditScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300;
    const customer = await Customer.create({ ...req.body, creditScore });
    res.json(customer);
};

const getAllCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};

const updateCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
};

const deleteCustomer = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
};

module.exports = { createCustomer, getAllCustomers, updateCustomer, deleteCustomer };
