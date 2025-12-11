const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Protect route - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1] ||
            req.headers['x-token'];
        if (!token) {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'NO_TOKEN',
                    message: 'No token provided, authorization denied'
                }
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: 'User not found'
                }
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'TOKEN_EXPIRED',
                    message: 'Token has expired'
                }
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token'
                }
            });
        }

        return res.status(500).json({
            success: false,
            status: 500,
            error: {
                code: 'SERVER_ERROR',
                message: 'Server error'
            }
        });

    }
};
// Authorize - check user role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                status: 403,
                error: {
                    code: 'FORBIDDEN',
                    message: `User role '${req.user.role}' is not authorized`
                }
            });
        }
        next();
    };
};
// Optional: Custom claim verification
exports.requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }
        next();
    };
};
