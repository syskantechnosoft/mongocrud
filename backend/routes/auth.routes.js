const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    register,
    login,
    getCurrentUser,
    changePassword,
    logout
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
// Validation rules
const registerValidation = [
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
        .matches(/[0-9]/).withMessage('Password must contain number')
        .matches(/[!@#$%^&*]/).withMessage('Password must contain special character')
];
const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
];
const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/).withMessage('Must contain uppercase letter')
        .matches(/[0-9]/).withMessage('Must contain number')
];
// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getCurrentUser);
router.put('/change-password', protect, changePasswordValidation, changePassword);
router.post('/logout', protect, logout);
module.exports = router;
