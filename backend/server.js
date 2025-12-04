const cors = require('cors');
require('dotenv').config();

const express = require("express");
const connectDB = require('./shared/middlewares/connect-db');
const bookRoutes = require("./modules/books/routes/bookRoutes.js");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`Books API endpoint: http://localhost:${PORT}/api/books`);
});