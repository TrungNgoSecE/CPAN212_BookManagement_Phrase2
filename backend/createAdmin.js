const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./modules/books/models/userModels");
require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(async () => {
  const hashed = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin User",
    email: "ziguruhihi@gmail.com",
    password: hashed,
    role: "admin"
  });

  console.log("Admin created successfully!");
  process.exit();
});
