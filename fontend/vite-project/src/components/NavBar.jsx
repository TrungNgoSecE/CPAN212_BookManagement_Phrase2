import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "12px 20px",
        background: "#111827",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <h2 style={{ margin: 0 }}>📚 Book Manager</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#a5b4fc" : "#e5e7eb",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Books
        </NavLink>
        <NavLink
          to="/add-book"
          style={({ isActive }) => ({
            color: isActive ? "#a5b4fc" : "#e5e7eb",
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Add Book
        </NavLink>
      </div>
    </nav>
  );
}
