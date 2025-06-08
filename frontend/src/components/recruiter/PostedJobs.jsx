import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdBusiness,
  MdLocationOn,
  MdAttachMoney,
  MdPeople,
} from "react-icons/md";
import "../../style/recruiter/PostedJobs.css";
import loader from "../../assets/loader.gif"; // ✅ Make sure you have this path correct

const PostedJobs = () => {
  const url = "https://jobnector.onrender.com/";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(url + "api/posted-jobs/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="posted-jobs-container">
      <h2>Your Posted Jobs</h2>

      {loading ? (
        <div className="fullscreen-loader">
          <img src={loader} alt="Loading..." />
        </div>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="jobs-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-card">
              <h3>{job.title}</h3>

              <p>
                <MdBusiness style={{ verticalAlign: "middle", marginRight: "6px" }} />
                <strong>Company:</strong> {job.recruiter_details?.company_name || "N/A"}
              </p>

              <p>
                <MdAttachMoney style={{ verticalAlign: "middle", marginRight: "6px" }} />
                <strong>Salary:</strong>{" "}
                {job.min_salary && job.max_salary
                  ? `Rs. ${job.min_salary} - Rs. ${job.max_salary} / ${job.salary_type}`
                  : "N/A"}
              </p>

              <p>
                <MdLocationOn style={{ verticalAlign: "middle", marginRight: "6px" }} />
                <strong>Location:</strong>{" "}
                {job.recruiter_details?.city
                  ? `${job.recruiter_details.city}, ${job.recruiter_details.state}`
                  : "N/A"}
              </p>

              <button
                onClick={() => navigate(`/job-candidates/${job.id}`)}
                className="view-candidates-btn"
              >
                <MdPeople style={{ verticalAlign: "middle", marginRight: "6px" }} />
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
