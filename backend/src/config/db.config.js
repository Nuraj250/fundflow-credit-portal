/**
 * @file db.js
 * @description Establishes a connection to MongoDB using Mongoose.
 * This utility is imported in the main `index.js` server entry point
 * to initialize database connectivity for the FundFlow backend.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected ');
    } catch (error) {
        console.error('MongoDB Connection Error ', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
