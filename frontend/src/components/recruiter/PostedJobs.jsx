import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/recruiter/PostedJobs.css";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posted-jobs/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Jobs fetched:", data); // 👈 Check what’s coming here

        if (response.status === 200) {
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="posted-jobs-container">
      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="jobs-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.recruiter_details?.company_name || "N/A"}
              </p>
              <p>
                <strong>Salary:</strong> {'Rs.'+job.min_salary + ' - ' + 'Rs'+job.min_salary + ' / ' + job.salary_type || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {job.recruiter_details?.city}, {job.recruiter_details?.state}
              </p>
              <button onClick={() => navigate(`/candidates/${job.id}`)}>
                View Candidates
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostedJobs;
