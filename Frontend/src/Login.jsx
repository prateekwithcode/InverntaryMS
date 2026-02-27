import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: username.trim(),
        password: password.trim(),
      });

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #4e73df, #1cc88a)",
      }}
    >
      <div
        className="bg-white p-5 rounded shadow-lg"
        style={{ width: "380px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">
          Welcome Back 👋
        </h2>

        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn w-100 text-white rounded-pill"
          style={{
            background: "#4e73df",
            padding: "10px",
            fontWeight: "600",
          }}
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;