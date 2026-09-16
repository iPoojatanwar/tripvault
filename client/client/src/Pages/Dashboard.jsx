import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [navigate]);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="dashboard">
        <div>
          {user && <h1>Welcome, {user.user.name} 👋</h1>}
          {user && <h1> {user.user.email}</h1>}
          <button onClick={logOut}>Logout</button>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

