import React from "react";
import "../../style/recruiter/RecruiterHome.css";
import { Link } from "react-router-dom";
import { Briefcase, Users, MessageCircle, PlusCircle, Eye, BarChart3 } from "lucide-react";

const RecruiterHome = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="recruiter-home" style={{ padding: "30px", margin: "auto" }}>
      <div className="welcome-banner" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "white" }}>
          👋 Welcome Back, {username?.replace(/_/g, " ")?.toUpperCase()}!
        </h1>
        <p style={{ fontSize: "18px", color: "#fff" }}>Manage your postings and find the best talent.</p>
      </div>

      <div className="dashboard-stats" style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap", alignItems: "center" }}>
        <div className="stat-card" style={cardStyle}>
          <Briefcase size={28} color="#1976d2" />
          <h2 style={countStyle}>12</h2>
          <p style={labelStyle}>Jobs Posted</p>
        </div>
        <div className="stat-card" style={cardStyle}>
          <Users size={28} color="#388e3c" />
          <h2 style={countStyle}>104</h2>
          <p style={labelStyle}>Applications</p>
        </div>
        <div className="stat-card" style={cardStyle}>
          <MessageCircle size={28} color="#f57c00" />
          <h2 style={countStyle}>5</h2>
          <p style={labelStyle}>New Messages</p>
        </div>
      </div>

      <div className="action-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="tile" style={tileStyle}>
          <PlusCircle size={26} color="#4caf50" />
          <h3 style={tileTitle}>Post a New Job</h3>
          <p>Find the right candidate in minutes.</p>
          <Link to="/post-job">
            <button style={btnStyle}>Post Job</button>
          </Link>
        </div>
        <div className="tile" style={tileStyle}>
          <Eye size={26} color="#1976d2" />
          <h3 style={tileTitle}>View Candidates</h3>
          <p>Check who applied to your jobs.</p>
          <Link to="/posted-jobs">
            <button style={btnStyle}>View List</button>
          </Link>
        </div>
        <div className="tile" style={tileStyle}>
          <BarChart3 size={26} color="#9c27b0" />
          <h3 style={tileTitle}>Analytics</h3>
          <p>Track job performance and engagement.</p>
          <Link to="/recruiter-dashboard">
            <button style={btnStyle}>View Report</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "#f9f9f9",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "200px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const countStyle = {
  fontSize: "28px",
  margin: "10px 0 5px 0",
  fontWeight: "600",
};

const labelStyle = {
  color: "#666",
};

const tileStyle = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const tileTitle = {
  margin: "12px 0 6px",
  fontSize: "18px",
  fontWeight: "600",
};

const btnStyle = {
  marginTop: "12px",
  padding: "8px 16px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.2s ease-in-out",
};

export default RecruiterHome;
