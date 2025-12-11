const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
// @desc User registration
// @route POST /api/v1/auth/register
// @access Public
exports.register = async (req, res) => {
    try {
        // Validation check
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                status: 422,
                errors: errors.array()
            });
        }
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                status: 409,
                error: {
                    code: 'EMAIL_EXISTS',
                    message: 'Email already registered'
                }
            });
        }

        // Create user
        user = new User({
            name,
            email,
            password,
            role: 'user'
        });

        // Save user (password will be hashed by pre-save hook)
        await user.save();

        // Generate JWT token
        const token = user.getJWT();

        // Send response
        res.status(201).json({
            success: true,
            status: 201,
            message: 'User registered successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            error: {
                code: 'REGISTRATION_ERROR',
                message: error.message
            }
        });
    }
};
// @desc User login
// @route POST /api/v1/auth/login
// @access Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                status: 400,
                error: {
                    code: 'MISSING_CREDENTIALS',
                    message: 'Please provide email and password'
                }
            });
        }

        // Check for user, include password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Check password match
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                status: 401,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                status: 403,
                error: {
                    code: 'ACCOUNT_INACTIVE',
                    message: 'Your account has been deactivated'
                }
            });
        }

        // Generate token
        const token = user.getJWT();

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            error: {
                code: 'LOGIN_ERROR',
                message: error.message
            }
        });
    }
};
// @desc Get current authenticated user
// @route GET /api/v1/auth/me
// @access Private
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            status: 200,
            data: user,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            error: {
                code: 'SERVER_ERROR',
                message: error.message
            }
        });
    }
};
// @desc Change password
// @route PUT /api/v1/auth/change-password
// @access Private
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Please provide current and new password'
            });
        }

        // Get user with password
        const user = await User.findById(req.user.id).select('+password');

        // Verify current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
// @desc Logout
// @route POST /api/v1/auth/logout
// @access Private
exports.logout = (req, res) => {
    // JWT is stateless, just return success
    // Client should remove token from localstorage/cookies
    res.status(200).json({
        success: true,
        message: 'Logout successful. Please clear your token.'
    });
};
