const express = require('express');
const { userRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

module.exports = app;