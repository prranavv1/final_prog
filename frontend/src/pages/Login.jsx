import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({
        username: username.trim(),
        password: password.trim(),
      });

      console.log("LOGIN RESPONSE:", res);

      if (res.message === "Login successful") {
        localStorage.setItem("username", res.username);
        localStorage.setItem("role", res.role);
        navigate("/current-engagements");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot reach backend. Is http://127.0.0.1:8000 running?");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="logo-box">
          <div className="logo-icon">∿</div>
        </div>

        <h1 className="brand">
          Prognosys<span>.</span>
        </h1>
        <p className="subtitle">ENTERPRISE ACCESS POINT</p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Authentication ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Secure Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          LOGIN →
        </button>
      </div>
    </div>
  );
}

export default Login;
