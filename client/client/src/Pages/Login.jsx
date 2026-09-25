import React, { useState } from 'react'
import toast from 'react-hot-toast'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
export const Login = () => {
  const navigate= useNavigate()
const [formData,setFormData]=useState({
    email:"",
    password:""
})
const[loading,setLoading]=useState(false)
const [error,setError]=useState("")
const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}
 const handleSubmit= async(e)=>{
e.preventDefault()
setError("")
setLoading(true)
try {
    const response = await API.post("/auth/login", formData)
    localStorage.setItem("token",response.data.token)
    setFormData({
      email:"",
      password:""  
    })
    toast.success("Login successful!")
    navigate("/dashboard");
 } catch (err) {
     const message=( err.response?.data?.message|| "Login failed. Please try again.")
setError(message)
toast.error(message)
 }
 finally{
    setLoading(false)
 }
 }
  return (
<div className="register-page">
      <div className="register-card">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <span>TripVault</span>
        </div>
       <h1>Welcome Back</h1>
<p className="subtitle">
 Log in to access your travel memories.
</p>
{error && (
  <div className="error-message">
    ⚠️ {error}
  </div>
)}
<form onSubmit={handleSubmit}>
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
        placeholder="Enter your password"
      />
    </div>
    <small>
      Password must contain at least 6 characters.
    </small>
  </div>
  <button
    type="submit"
    className="register-btn"
    disabled={loading}
  >
    {loading ? "Logging in..." : "Login "}
  </button>
</form>
<div className="login-section">
  <span>
    Don't have an account?
  </span>
    <Link to={'/register'}>Register </Link>
</div>
</div>
</div>
  )
}
export default Login
