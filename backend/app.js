const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const askRoute = require('./routes/askRoute');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/ask', askRoute);

module.exports = app;
