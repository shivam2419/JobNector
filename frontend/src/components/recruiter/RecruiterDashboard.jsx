import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, Edit3, Trash2, CalendarDays } from "lucide-react";

const RecruiterDashboard = () => {
  const backendUrl = "https://jobnector.onrender.com";
  const [jobs, setJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await fetch(backendUrl + "/api/posted-jobs/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchApplicationsCount = async () => {
    try {
      const response = await fetch(backendUrl + "/api/get-jobs/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTotalApplications(data.length);
      } else {
        console.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`${backendUrl}/api/create-job/${jobId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== jobId));
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicationsCount();
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "30px", textAlign: "center" }}>
        🎯 Recruiter Dashboard
      </h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "40px", justifyContent: "center" }}>
        <div style={{ background: "#e3f2fd", padding: "20px", borderRadius: "10px", flex: 1, textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
            <Briefcase size={22} /> Total Jobs Posted
          </h3>
          <p style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>{jobs.length}</p>
        </div>
        <div style={{ background: "#e8f5e9", padding: "20px", borderRadius: "10px", flex: 1, textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
            <Users size={22} /> Total Applications Received
          </h3>
          <p style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>{totalApplications}</p>
        </div>
      </div>

      <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px", textAlign: "center" }}>
        📋 Posted Jobs
      </h3>

      <div
        className="jobs-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              padding: "18px",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Briefcase size={18} />
                {job.title}
              </h4>
              <p style={{ fontSize: "14px", color: "#333" }}>{job.description?.slice(0, 100)}...</p>
              <p style={{ fontSize: "13px", color: "#555", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <CalendarDays size={14} />
                Posted on: {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(job.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#4caf50",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.2s",
                }}
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.2s",
                }}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive grid */}
      <style>
        {`
          @media (max-width: 768px) {
            .jobs-list {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RecruiterDashboard;
