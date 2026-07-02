import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    students: 0,
    companies: 0,
    drives: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/counts"
      );

      if (res.data.success) {
        setCounts(res.data.counts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      navigate("/");
    }
  };

  return (
    <div className="dashboard">

      <div className="navbar">
        <h2>🎓 Placement Management System</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-layout">

        {/* Left Sidebar */}
        <div className="left-sidebar">

          <div className="side-card">
            <h3>👤 Admin</h3>
            <p>Welcome Back!</p>
          </div>

          <div className="side-card">
            <h3>⚡ Quick Actions</h3>

            <Link to="/students">
              <button>Add Student</button>
            </Link>

            <br /><br />

            <Link to="/companies">
              <button>Add Company</button>
            </Link>

            <br /><br />

            <Link to="/drives">
              <button>Add Drive</button>
            </Link>

          </div>

        </div>

        {/* Center Content */}
        <div className="center-content">

          <div className="welcome">
            <h1>Welcome Admin 👋</h1>
            <p>Manage Students, Companies and Placement Drives</p>
          </div>

          {/* Statistics */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              margin: "35px",
              flexWrap: "wrap",
            }}
          >

            <div className="card">
              <div className="icon">👨‍🎓</div>
              <h2>{counts.students}</h2>
              <p>Total Students</p>
            </div>

            <div className="card">
              <div className="icon">🏢</div>
              <h2>{counts.companies}</h2>
              <p>Total Companies</p>
            </div>

            <div className="card">
              <div className="icon">📅</div>
              <h2>{counts.drives}</h2>
              <p>Total Drives</p>
            </div>

          </div>

          {/* Navigation Cards */}
          <div className="card-container">

            <div className="card">
              <div className="icon">🎓</div>
              <h2>Students</h2>
              <p>Manage student records</p>

              <Link to="/students">
                <button>Open</button>
              </Link>
            </div>

            <div className="card">
              <div className="icon">🏢</div>
              <h2>Companies</h2>
              <p>Manage company details</p>

              <Link to="/companies">
                <button>Open</button>
              </Link>
            </div>

            <div className="card">
              <div className="icon">📅</div>
              <h2>Placement Drives</h2>
              <p>Manage placement drives</p>

              <Link to="/drives">
                <button>Open</button>
              </Link>
            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">

          <div className="side-card">
            <h3>📢 Announcements</h3>
            <p>• TCS Drive - 15 July</p>
            <p>• Infosys Hiring Open</p>
            <p>• Update Student Profiles</p>
          </div>

          <div className="side-card">
            <h3>📊 Dashboard Overview</h3>
            <p>Total Students : {counts.students}</p>
            <p>Total Companies : {counts.companies}</p>
            <p>Total Drives : {counts.drives}</p>
          </div>

          <div className="side-card">
            <h3>📅 Upcoming Drive</h3>
            <p>Accenture Recruitment</p>
            <p>10 July 2026</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;