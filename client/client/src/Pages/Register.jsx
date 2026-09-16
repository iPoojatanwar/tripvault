import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try { 
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );   
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Account created successfully!");
      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again.",  
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <span>TripVault</span>
        </div>
        <h1>Create Account</h1>
        <p className="subtitle">
          Join TripVault and start saving your travel memories.
        </p>
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>
            <div className="input-box">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>
            <div className="input-box">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <div className="input-box">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Create a password"
              />
            </div>
            <small>
              Password must contain at least 6 characters.
            </small>
          </div>
          <button
            type="submit"
            className="register-btn"
            disabled={loading}>
            {loading
              ? "Creating Account..."
              : "Create Account "}
          </button>
        </form>
        <div className="login-section">
          <span>
            Already have an account?
          </span>
            <Link to={'/login'}>Login </Link> 
          
        </div>
      </div>
    </div>
  );
};

export default Register;
