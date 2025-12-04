import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import "../components/styles/BooksPage.css";

export default function BooksPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header-books-page">
        <h1>Books Collection</h1>
        <button onClick={() => navigate("/add-book")}>Add New Book</button>
      </header>

      <BookList />
    </div>
  );
}
