import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="left-panel">
        <div className="left-content">

          <div className="logo-circle">
            🎓
          </div>

          <h1>
            Placement <br />
            Management <br />
            <span>System</span>
          </h1>

          <div className="line"></div>

          <p>
            Simplify placement processes,
            connect talented students with
            companies and build a successful future.
          </p>

        </div>
      </div>

      {/* Right Side */}
      <div className="right-panel">

        <div className="login-card">

          <h1 className="title">
            Placement <br />
            Management
          </h1>

          <p className="subtitle">
            Welcome Back Admin 👋
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;