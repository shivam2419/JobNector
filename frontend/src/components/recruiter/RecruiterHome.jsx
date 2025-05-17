import React from 'react';
import '../../style/recruiter/RecruiterHome.css';
import { Link } from 'react-router-dom';
const RecruiterHome = () => {
  return (
    <div className="recruiter-home">
      <div className="welcome-banner">
        <h1>Welcome Back, Recruiter!</h1>
        <p>Manage your postings and find the best talent.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>12</h2>
          <p>Jobs Posted</p>
        </div>
        <div className="stat-card">
          <h2>104</h2>
          <p>Applications</p>
        </div>
        <div className="stat-card">
          <h2>5</h2>
          <p>New Messages</p>
        </div>
      </div>

      <div className="action-tiles">
        <div className="tile">
          <h3>Post a New Job</h3>
          <p>Find the right candidate in minutes.</p>
          <button><Link to="/post-job">Post Job</Link></button>
        </div>
        <div className="tile">
          <h3>View Candidates</h3>
          <p>Check who applied to your jobs.</p>
          <button>View List</button>
        </div>
        <div className="tile">
          <h3>Analytics</h3>
          <p>Track job performance and engagement.</p>
          <button>View Report</button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
