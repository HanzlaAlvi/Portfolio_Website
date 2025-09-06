import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend Login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);

      // Portfolio Check
      const portfolioRes = await axios.get(
        "http://localhost:5000/api/portfolio/me",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );

      if (portfolioRes.data && portfolioRes.data.name) {
        navigate("/portfolio");
      } else {
        navigate("/fill-portfolio");
      }

      setFormData({ email: "", password: "" });
    } catch (err) {
      alert(
        err.response?.data?.message || "Error logging in. Please try again."
      );
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Please log in to your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="login-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="login-link">
            Sign Up
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;