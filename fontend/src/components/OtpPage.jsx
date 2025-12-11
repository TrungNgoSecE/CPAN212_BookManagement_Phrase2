import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function OtpPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const email = localStorage.getItem("pendingEmail");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      
      loginUser(res.data.user, res.data.token);
      localStorage.removeItem("pendingEmail");

      navigate("/");
    } catch (err) {
      setError("Invalid or expired OTP");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="book-form">
        <h2>Verify OTP</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label>Enter OTP sent to {email}</label>
            <input type="text" required value={otp} onChange={(e)=>setOtp(e.target.value)} />
          </div>

          <button className="btn-submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
