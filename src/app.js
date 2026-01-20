const express = require('express');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount Routes
app.use('/api/resources', resourceRoutes);

// Health Check Endpoint (Vital for Docker/K8s)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

module.exports = app;