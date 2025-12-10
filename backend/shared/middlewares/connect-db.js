const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error("DB_URL is not defined in .env");
    }

    await mongoose.connect(dbUrl);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Database connection failed!", error);
    process.exit(1);
  }
}

module.exports = connectDB;
