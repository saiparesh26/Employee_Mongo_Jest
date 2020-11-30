const express = require('express');
const { config } = require('dotenv');

// Load env variables
config({ path: './config/config.env' });

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Use Express Parser
app.use(express.json());

// Mount Routes
app.use('/employees', employeeRoutes);

module.exports = app;
