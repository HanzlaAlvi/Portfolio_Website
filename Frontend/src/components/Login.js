import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { login as loginRequest } from "../services/authService";
import { getMyPortfolio } from "../services/portfolioService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { message, token } = await loginRequest(formData);
      alert(message);
      login(token);

      const portfolio = await getMyPortfolio().catch(() => null);
      navigate(portfolio?.name ? "/portfolio" : "/fill-portfolio");

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
