const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rest_api';
        const conn = await mongoose.connect(mongoUri);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error(`❌ Database Connection Error: ${ error.message }`);
        process.exit(1);
    }
};
module.exports = connectDB;
