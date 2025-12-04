import { useEffect, useState } from "react";

const currentYear = new Date().getFullYear();

const emptyValues = {
  title: "",
  author: "",
  genre: "",
  rating: "",
  publishedYear: currentYear,
};

export default function BookForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState(emptyValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...emptyValues,
        ...initialValues,
      });
    } else {
      setFormData(emptyValues);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate(data) {
    const err = {};

    if (!data.title || !data.title.trim()) {
      err.title = "Title is required.";
    }
    if (!data.author || !data.author.trim()) {
      err.author = "Author is required.";
    }

    if (data.rating === "" || data.rating === null) {
      err.rating = "Rating is required.";
    } else {
      const r = Number(data.rating);
      if (Number.isNaN(r)) {
        err.rating = "Rating must be a number.";
      } else if (r < 0 || r > 5) {
        err.rating = "Rating must be between 0 and 5.";
      }
    }

    if (!data.publishedYear) {
      err.publishedYear = "Published year is required.";
    } else {
      const y = Number(data.publishedYear);
      if (Number.isNaN(y)) {
        err.publishedYear = "Published year must be a number.";
      } else if (y < 0 || y > currentYear + 1) {
        err.publishedYear = `Year must be between 0 and ${currentYear + 1}.`;
      }
    }

    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const payload = {
      ...formData,
      rating: Number(formData.rating),
      publishedYear: Number(formData.publishedYear),
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
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          placeholder="Book Title"
        />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          disabled={loading}
          placeholder="Author"
        />
        {errors.author && <p className="field-error">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          disabled={loading}
          placeholder="Genre"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating (0–5) *</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          disabled={loading}
          placeholder="Rating (0–5)"
        />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="publishedYear">Published Year *</label>
        <input
          id="publishedYear"
          name="publishedYear"
          type="number"
          value={formData.publishedYear}
          onChange={handleChange}
          disabled={loading}
          placeholder="Published Year"
        />
        {errors.publishedYear && (
          <p className="field-error">{errors.publishedYear}</p>
        )}
      </div>

      <button className="btn-primary" disabled={loading} type="submit">
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}
