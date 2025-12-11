const User = require('../models/user');
const { validationResult } = require('express-validator');
// @desc Get all users
// @route GET /api/v1/users
// @access Private (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Filtering
        const filter = {};
        if (req.query.role) filter.role = req.query.role;
        if (req.query.isActive) filter.isActive = req.query.isActive === 'true';

        // Sorting
        const sort = req.query.sort || '-createdAt';

        const users = await User.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            status: 200,
            data: users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
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
// @desc Get single user by ID
// @route GET /api/v1/users/:id
// @access Private
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                status: 404,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: `User with ID ${req.params.id} not found`
                }
            });
        }

        res.status(200).json({
            success: true,
            status: 200,
            data: user,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                status: 400,
                error: {
                    code: 'INVALID_ID',
                    message: 'Invalid user ID'
                }
            });
        }
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
// @desc Create new user
// @route POST /api/v1/users
// @access Public
exports.createUser = async (req, res) => {
    try {
        // Check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                status: 422,
                errors: errors.array()
            });
        }
        const { name, email, password, age } = req.body;

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
        user = new User({ name, email, password, age });
        await user.save();

        // Generate JWT token
        const token = user.getJWT();

        res.status(201).json({
            success: true,
            status: 201,
            data: user,
            token,
            message: 'User created successfully',
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
// @desc Update user
// @route PUT /api/v1/users/:id
// @access Private (own profile or admin)
exports.updateUser = async (req, res) => {
    try {
        // Validate ID
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                status: 422,
                errors: errors.array()
            });
        }
        // Don't allow password update through this endpoint
        const { name, email, age, role } = req.body;

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                status: 404,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: `User with ID ${req.params.id} not found`
                }
            });
        }

        // Check authorization
        if (req.user.id !== user.id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                status: 403,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Not authorized to update this user'
                }
            });
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        if (role && req.user.role === 'admin') user.role = role;

        await user.save();

        res.status(200).json({
            success: true,
            status: 200,
            data: user,
            message: 'User updated successfully',
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
// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private (own profile or admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                status: 404,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: `User with ID ${req.params.id} not found`
                }
            });
        }

        // Check authorization
        if (req.user.id !== user.id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                status: 403,
                error: {
                    code: 'FORBIDDEN',
                    message: 'Not authorized to delete this user'
                }
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(204).send();

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
