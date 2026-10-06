import React, { useState } from "react";
import toast from "react-hot-toast";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const initialFormData = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      setFormData(initialFormData);

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please try again.";

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

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Log in to access your travel memories.
        </p>

        {error && (
          <div className="error-message" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <small>Password must contain at least 6 characters.</small>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="login-section">
          <span>Don't have an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
