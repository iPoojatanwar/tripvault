import React, { useState } from "react";
import "./Register.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
const initialFormData = {
  name: "",
  username: "",
  email: "",
  password: "",
  bio: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      setError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      toast.success("Account created successfully!");
      setFormData(initialFormData);
      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="register-page">
      <div className="register-card">
        <div className="logo" aria-label="TripVault">
          <span className="logo-icon" aria-hidden="true">
            ✈️
          </span>
          <span>TripVault</span>
        </div>
        <h1>Create Account</h1>
        <p className="subtitle">
          Join TripVault and start saving your travel memories.
        </p>
        {error && (
          <div className="error-message" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-box">
              <span className="input-icon" aria-hidden="true">
                👤
              </span>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-box">
              <span className="input-icon" aria-hidden="true">
                @
              </span>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                placeholder="Choose a username"
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-box">
              <span className="input-icon" aria-hidden="true">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-box">
              <span className="input-icon" aria-hidden="true">
                🔒
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Create a password"
                disabled={loading}
              />
            </div>
            <small>Password must contain at least 6 characters.</small>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              maxLength={250}
              placeholder="Tell us a little about yourself..."
              disabled={loading}
            />
            <small>{formData.bio.length}/250 characters</small>
          </div>
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner" aria-hidden="true" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="login-section">
          <span>Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
