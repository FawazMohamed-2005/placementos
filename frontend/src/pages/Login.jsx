import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          Placement<span>OS</span>
        </div>
        <p className="login-subtitle">Welcome back — sign in to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>

          <button type="submit" className="btn-login">
            Sign in
          </button>
        </form>

        <div className="divider">or</div>

        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>

      </div>
    </div>
  );
}

export default Login;