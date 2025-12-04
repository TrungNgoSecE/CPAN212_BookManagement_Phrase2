import { Routes, Route,BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import BooksPage from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import ViewBookPage from "./pages/ViewBookPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
        <Route path="/books/:id" element={<ViewBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
