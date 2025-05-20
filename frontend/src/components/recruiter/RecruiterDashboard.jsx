import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

const RecruiterDashboard = () => {
  const backendUrl = "https://jobnector.onrender.com";
  const [jobs, setJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const navigate = useNavigate();  // React Router hook

  // Fetch posted jobs
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

  // Fetch applications count
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

  // Delete job
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
        // Remove deleted job from state
        setJobs(jobs.filter((job) => job.id !== jobId));
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Edit job (navigate to edit page)
  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicationsCount();
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px" }}>
        Recruiter Dashboard
      </h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#d0e7ff", padding: "20px", borderRadius: "8px", flex: 1 }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
            Total Jobs Posted
          </h3>
          <p style={{ fontSize: "26px", margin: 0 }}>{jobs.length}</p>
        </div>
        <div style={{ background: "#d0ffd8", padding: "20px", borderRadius: "8px", flex: 1 }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
            Total Applications Received
          </h3>
          <p style={{ fontSize: "26px", margin: 0 }}>{totalApplications}</p>
        </div>
      </div>

      <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}>Posted Jobs</h3>

      <div
        className="jobs-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            className="job-card"
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "6px",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>
                {job.title}
              </h4>
              <p>{job.description?.slice(0, 100)}...</p>
              <p>
                <strong>Posted on:</strong>{" "}
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(job.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#4caf50",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive style for mobile */}
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
