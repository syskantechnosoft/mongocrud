const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
// Validation middleware
const validateUserCreation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain number'),
    body('age')
        .optional()
        .isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120')
];
const validateUserUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format'),
    body('age')
        .optional()
        .isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120')
];
const validateUserId = [
    param('id')
        .isMongoId().withMessage('Invalid user ID format')
];
// Routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.post('/', validateUserCreation, createUser);
router.get('/:id', protect, validateUserId, getUserById);
router.put('/:id', protect, validateUserId, validateUserUpdate, updateUser);
router.delete('/:id', protect, validateUserId, deleteUser);
module.exports = router;
