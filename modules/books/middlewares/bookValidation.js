import { body } from "express-validator";

export const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("rating").isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
  body("publishedYear").isInt({ min: 1500, max: 2025 }).withMessage("Enter a valid year")
];
