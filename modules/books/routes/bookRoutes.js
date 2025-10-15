import express from "express";
import { validationResult } from "express-validator";
import {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook
} from "../models/bookModel.js";
import { validateBook } from "../middlewares/bookValidation.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getAllBooks());
});

router.get("/:id", (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

router.post("/", validateBook, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newBook = addNewBook(req.body);
  res.status(201).json(newBook);
});

router.put("/:id", validateBook, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const updated = updateBook(parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "Book not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteBook(parseInt(req.params.id));
  if (!deleted) return res.status(404).json({ message: "Book not found" });
  res.json(deleted);
});

export default router;
