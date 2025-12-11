import { useEffect, useState } from "react";
import api from "../api/api";

const currentYear = new Date().getFullYear();

const emptyValues = {
  title: "",
  author: "",
  genre: "",
  rating: "",
  publishedYear: currentYear,
  coverImage: null,
};

export default function BookForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...emptyValues,
        ...initialValues,
      });
      setImagePreview(initialValues.coverImage || null);
    } else {
      setFormData(emptyValues);
      setImagePreview(null);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function validate(data) {
    const err = {};

    if (!data.title.trim()) err.title = "Title is required.";
    if (!data.author.trim()) err.author = "Author is required.";

    if (data.rating === "" || data.rating === null) {
      err.rating = "Rating is required.";
    } else {
      const r = Number(data.rating);
      if (Number.isNaN(r)) err.rating = "Rating must be a number.";
      else if (r < 0 || r > 5) err.rating = "Rating must be between 0 and 5.";
    }

    if (!data.publishedYear) {
      err.publishedYear = "Published year is required.";
    } else {
      const y = Number(data.publishedYear);
      if (Number.isNaN(y))
        err.publishedYear = "Published year must be a number.";
      else if (y < 0 || y > currentYear + 1)
        err.publishedYear = `Year must be between 0 and ${currentYear + 1}.`;
    }

    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    let finalImageUrl = formData.coverImage || null;

    if (imageFile) {
      const fd = new FormData();
      fd.append("image", imageFile);

      const res = await api.post("/books/upload-cover", fd);
      finalImageUrl = res.data.imageUrl;
    }

    const payload = {
      ...formData,
      rating: Number(formData.rating),
      publishedYear: Number(formData.publishedYear),
      coverImage: finalImageUrl,
    };

    onSubmit(payload);
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-error">
          Please fix the highlighted errors.
        </div>
      )}

      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.author && <p className="field-error">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label>Genre</label>
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Rating (0–5) *</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label>Published Year *</label>
        <input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.publishedYear && (
          <p className="field-error">{errors.publishedYear}</p>
        )}
      </div>

      <div className="form-group">
        <label>Cover Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            style={{ width: 160, borderRadius: 8, marginTop: 10 }}
          />
        )}
      </div>

      <button className="btn-primary" disabled={loading} type="submit">
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
