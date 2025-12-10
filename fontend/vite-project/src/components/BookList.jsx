import { useEffect, useState } from "react";
import BookItem from "./BookItem";
import api from "../api/api";
import "./styles/Booklist.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/books");

      const bookArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : Array.isArray(response.data.books)
        ? response.data.books
        : [];

      setBooks(bookArray);
    } catch (err) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async bookId => {
    const ok = window.confirm("Are you sure you want to delete this book?");
    if (!ok) return;

    try {
      setDeletingId(bookId);
      await api.delete(`/books/${bookId}`);
      setBooks(prev => prev.filter(book => book._id !== bookId));
      alert("Book deleted successfully!");
    } catch (err) {
      alert("Failed to delete book. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;

  if (!books.length) {
    return <p>No books yet. Click “Add New Book” to create one.</p>;
  }

  return (
    <div id="book-list-container">
      {books.map(book => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={handleDeleteBook}
          deleting={deletingId === book._id}
        />
      ))}
    </div>
  );
};

export default BookList;
