const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false // Don't return password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        age: {
            type: Number,
            min: [18, 'Age must be at least 18'],
            max: [120, 'Age cannot exceed 120']
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true // Automatically manage createdAt and updatedAt
    }
);
// Hash password before saving
userSchema.pre('save', async function () {
    // Only hash if password is new or modified
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});
// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};
// Method to generate JWT
userSchema.methods.getJWT = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};
// Remove password before returning user
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
module.exports = mongoose.model('User', userSchema);
