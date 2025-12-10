const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./modules/books/models/userModels");

async function createUser() {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error(" DB_URL is undefined. Check .env file");
    }

    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Normal User",
      email: "thienbinhhq2006@gmail.com",
      password: hashedPassword,
      role: "user" 
    });

    console.log("User created successfully!");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

createUser();
