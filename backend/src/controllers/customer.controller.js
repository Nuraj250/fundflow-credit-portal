const Customer = require('../models/customer.model');

const createCustomer = async (req, res) => {
    try {
        const { name, NIC, email, password, monthlyIncome } = req.body;

        if (!name || !NIC || !email || !password || !monthlyIncome) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existing = await Customer.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            name,
            NIC,
            email,
            password: hashedPassword,
            monthlyIncome,
            role: 'customer',
            creditScore: Math.floor(Math.random() * (850 - 300 + 1)) + 300,
        });

        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Create customer failed' });
    }
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
