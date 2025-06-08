import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/recruiter/RecruiterNavbar.css";

const RecruiterNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    navigate("/");  // React-router navigation instead of window.location.href
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="recruiter-navbar">
      <div className="navbar-top">
        <Link className="brand" to="/recruiter">
          Recruiter Panel
        </Link>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
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
          <a href="" onClick={logout} className="logout-btn" >Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;
