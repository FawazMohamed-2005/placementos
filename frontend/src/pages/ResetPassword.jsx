import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const handleReset = async (e) => {
    e.preventDefault();

    await api.post("/auth/reset-password", {
      token,
      password,
    });

    alert("Password reset successful");
    navigate("/");
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;