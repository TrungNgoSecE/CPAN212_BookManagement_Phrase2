
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: false,
      trim: true,

    },
    genre: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
    },
  },
  {

    timestamps: true,
  }
);


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;