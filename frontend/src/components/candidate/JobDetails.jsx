import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/candidate/JobDetails.css";
import loader from "../../assets/loader.gif";
const JobDetails = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const url = "https://jobnector.onrender.com/";

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(
          `${url}api/job/${job_id}/?user_id=${localStorage.getItem("user_id")}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        setJob(data);
        setAlreadyApplied(data.already_applied); // <-- Set flag here
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}api/apply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("user_id"),
          job_id: job_id,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Application submitted successfully!");
        setAlreadyApplied(true);
      } else if (data.error === "You have already applied to this job.") {
        setAlreadyApplied(true);
        alert(data.error);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  if (loading) return <div><center><img src={loader} alt="" style={{height: "100px", width: "100px", marginTop: "100px"}}/></center></div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="job-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>
      <div className="job-title">{job.title}</div>
      <div className="company-name">
        {job.recruiter_details?.company_name || "N/A"}
      </div>
      <div className="location">
        {job.recruiter_details?.city + ", " + job.recruiter_details?.state ||
          "Remote"}
      </div>

      <div className="job-info">
        <div>
          <span className="section-title">Stipend</span>
          <br />₹{job.min_salary} - {job.max_salary} / {job.salary_type}
        </div>
        <div>
          <span className="section-title">Duration</span>
          <br />
          {job.duration}
        </div>
      </div>

      <div>
        <div className="section-title">Required Skills:</div>
        <ul>
          {job.skills?.map((skill, index) => <li key={index}>{skill}</li>) || (
            <li>No skills listed</li>
          )}
        </ul>
      </div>

      <div>
        <div className="section-title">Job Description:</div>
        <div className="section-content">{job.description}</div>
      </div>

      <div>
        <div className="section-title">Perks:</div>
        <ul>
          {job.perks?.map((perk, index) => <li key={index}>{perk}</li>) || (
            <li>No perks listed</li>
          )}
        </ul>
      </div>

      {alreadyApplied ? (
        <button className="apply-button" disabled style={{ opacity: "70%" }}>
          Already Applied
        </button>
      ) : (
        <button className="apply-button" onClick={handleSubmit}>
          Apply Now
        </button>
      )}
    </div>
  );
};

export default JobDetails;
