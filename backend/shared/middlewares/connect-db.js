const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const DB_URL = process.env.DB_URL;

async function connectDB() {
    try {
        const dbUrl = process.env.DB_URL;

        if (!dbUrl) {
            throw new Error("DB_URL is not defined in your .env file");
        }

        await mongoose.connect(dbUrl, {
            dbName: "BookManagement"
        });

        console.log("Database connected successfully!");


    } catch (error) {
        console.error("Database connection failed!", error);

        process.exit(1);
    }
}

module.exports = connectDB;