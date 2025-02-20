// backend/src/app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const studyGroupRoutes = require('./routes/studyGroupRoutes');
const { errorHandler } = require('./utils/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/study-groups', studyGroupRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'StudyMatch AI backend is running' });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Export the app
module.exports = app;
