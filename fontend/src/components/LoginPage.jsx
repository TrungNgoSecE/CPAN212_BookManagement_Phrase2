import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("pendingEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="book-form">
        <h2>Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>

          <button className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
}
