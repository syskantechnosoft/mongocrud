require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
// Initialize Express app
const app = express();
// Connect to database
connectDB();
// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        error: {
            code: err.code || 'SERVER_ERROR',
            message: err.message || 'Internal server error'
        }
    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
