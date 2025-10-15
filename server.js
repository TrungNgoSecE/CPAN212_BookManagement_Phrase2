import express from "express";
import bookRoutes from "./modules/books/routes/bookRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`📚 Books API endpoint: http://localhost:${PORT}/api/books`);
});
