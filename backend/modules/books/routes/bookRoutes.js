const express = require("express");
const { validationResult } = require("express-validator");
const Book = require("../models/bookModels.js");


const {
  validateBookCreation,
  validateBookUpdate
} = require("../middlewares/bookValidation.js");


const router = express.Router();



router.get("/", async (req, res, next) => {
  try {
    const { search, sort, page = 1, limit = 500, genre } = req.query;


    let query = {};


    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }


    let sortOption = { createdAt: -1 };
    if (sort) {
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      sortOption = { [sortField]: sortOrder };
    }


    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;


    const books = await Book.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);


    const totalBooks = await Book.countDocuments(query);


    res.json({
      message: "Books fetched successfully",
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalBooks / limitNum),
        totalBooks,
      },
      data: books,
    });
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);


    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
});



router.post("/", validateBookCreation, async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();


    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
});



router.put("/:id", validateBookUpdate, async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );


    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);


    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", deletedBook });
  } catch (err) {
    next(err);
  }
});


module.exports = router;