import React, { useState } from "react";
import "./Register.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
const Register = () => {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username:"",
    bio:""
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
     await API.post("/auth/register",formData);   
      setFormData({
        name: "",
        username:"",
        email: "",
        password: "",
        bio
      });
      toast.success("Account created successfully!");
     setTimeout(()=>{ navigate('/login')},1000)
    } catch (err) {
const message =
  err.response?.data?.message ||
  "Registration failed. Please try again.";
setError(message);
toast.error(message);
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
            <label htmlFor="username">
              Username
            </label>
            <div className="input-box">
              
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
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
         <div className="form-group">
  <label
    htmlFor="bio"
    className="mb-2 block text-sm font-semibold text-slate-700"
  >
    Bio
  </label>
  <textarea
    name="bio"
    id="bio"
    value={formData.bio}
    onChange={handleChange}
    rows={4}
    placeholder="Tell us a little about yourself..."
    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
  />
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
