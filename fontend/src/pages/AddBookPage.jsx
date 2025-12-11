import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import BookForm from "../components/BookForm";
import "../components/styles/BookForm.css";

export default function AddBookPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleCreate(data) {
    try {
      setLoading(true);
      setApiError(null);
      setSuccess(null);

      await api.post("/books", data);

      setSuccess("Book added successfully!");
      navigate("/");
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Error adding book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="book-form">
      <h2>Add New Book</h2>

      {apiError && <div className="alert alert-error">{apiError}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <BookForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
