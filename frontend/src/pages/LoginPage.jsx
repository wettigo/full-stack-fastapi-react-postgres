import { useState, useContext, useEffect } from "react";
import axios from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AuthPages.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("grant_type", "password");

      const response = await axios.post("/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = response.data.access_token;
      if (!token) {
        setError("Token not received from server");
        return;
      }

      localStorage.setItem("access_token", token);
      login({ username, token }); 

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Incorrect username or password!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Registration</Link>
      </p>
    </div>
  );
}

export default LoginPage;
