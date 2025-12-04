import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function ViewBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setApiError(null);
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setApiError("Failed to load book.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (apiError) return <div className="alert alert-error">{apiError}</div>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre || "N/A"}
      </p>
      <p>
        <strong>Published:</strong> {book.publishedYear}
      </p>
      <p>
        <strong>Rating:</strong> {book.rating}/5 ⭐
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link to={`/edit/${book._id}`} className="edit-btn">
          Edit
        </Link>
        <Link to="/" className="view-btn" style={{ marginLeft: "0.5rem" }}>
          Back to List
        </Link>
      </div>
    </div>
  );
}
