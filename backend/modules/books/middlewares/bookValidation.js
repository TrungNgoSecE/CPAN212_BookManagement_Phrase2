const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation");

const validateBookCreation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string")
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long"),

  body("isbn")
    .optional()
    .isISBN()
    .withMessage("Invalid ISBN format"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Published year must be a valid year between 1000 and ${new Date().getFullYear()}`),

  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string"),

  checkValidation,
];

const validateBookUpdate = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("author")
    .optional()
    .isString()
    .withMessage("Author must be a string")
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long"),

  body("isbn")
    .optional()
    .isISBN()
    .withMessage("Invalid ISBN format"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Published year must be a valid year between 1000 and ${new Date().getFullYear()}`),

  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string"),

  checkValidation,
];

module.exports = {
  validateBookCreation,
  validateBookUpdate,
};