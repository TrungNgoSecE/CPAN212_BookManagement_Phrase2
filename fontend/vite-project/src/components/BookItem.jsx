import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import "./styles/BookItem.css";

const BookItem = ({ book, onDelete, deleting }) => {
  const { user } = useAuth(); 
  return (
    <div className="book-item">
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

        {user?.role === "admin" && (
          <Link to={`/edit/${book._id}`} className="edit-btn">
            Edit
          </Link>
        )}

        {user?.role === "admin" && (
          <button
            className="delete-btn"
            onClick={() => onDelete(book._id)}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}

      </div>
    </div>
  );
};

export default BookItem;
