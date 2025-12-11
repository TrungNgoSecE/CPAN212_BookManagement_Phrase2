import { Link } from "react-router-dom";
import "./styles/BookItem.css";

const BookItem = ({ book, onDelete, deleting }) => {
  return (
    <div className="book-item">
      {book.coverImage && (
    <img 
      src={book.coverImage} 
      className="book-cover"
      alt={book.title}
      style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }}
    />
)}
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Published:</strong> {book.publishedYear}
      </p>
      <p className="book-rating">
        <strong>Rating:</strong> {book.rating}/5 ⭐
      </p>

      <div className="book-actions">
        <Link to={`/books/${book._id}`} className="view-btn">
          View
        </Link>
        <Link to={`/edit/${book._id}`} className="edit-btn">
          Edit
        </Link>
        <button
          className="delete-btn"
          onClick={() => onDelete(book._id)}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default BookItem;
