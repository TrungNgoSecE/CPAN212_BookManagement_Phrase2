import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import BookForm from "../components/BookForm";
import "../components/styles/BookForm.css";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        setLoadingBook(true);
        setApiError(null);
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setApiError("Failed to load book data.");
      } finally {
        setLoadingBook(false);
      }
    }
    loadBook();
  }, [id]);

  async function handleUpdate(data) {
    try {
      setSaving(true);
      setApiError(null);
      setSuccess(null);

      await api.put(`/books/${id}`, data);

      setSuccess("Book updated successfully!");
      navigate("/");
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Error updating book. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingBook) return <p>Loading book...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-form">
      <h2>Edit Book</h2>

      {apiError && <div className="alert alert-error">{apiError}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <BookForm initialValues={book} onSubmit={handleUpdate} loading={saving} />
    </div>
  );
}
