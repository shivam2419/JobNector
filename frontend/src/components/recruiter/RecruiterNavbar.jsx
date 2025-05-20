import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/recruiter/RecruiterNavbar.css";

const RecruiterNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="recruiter-navbar">
      <div className="navbar-top">
        <Link className="brand" to="/recruiter">
          Recruiter Panel
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <div className="navbar-left">
          <Link to="/recruiter-dashboard">Dashboard</Link>
          <Link to="/post-job">Post a Job</Link>
          <Link to="/posted-jobs">View Applicants</Link>
        </div>
        <div className="navbar-right">
          <Link to="/recruiter-profile">Profile</Link>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;
