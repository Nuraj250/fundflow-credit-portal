/**
 * @file index.js
 * @description Entry point of the backend server.
 * - Loads environment variables.
 * - Connects to MongoDB using Mongoose.
 * - Applies middleware: CORS, JSON parsing, logging.
 * - Registers route modules: Auth, Customers, Loans.
 * - Starts the Express server on the specified port.
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db.config');

const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const loanRoutes = require('./routes/loan.routes');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
