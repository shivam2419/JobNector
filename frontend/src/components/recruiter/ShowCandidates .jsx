import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/recruiter/ShowCandidates.css";

const ShowCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const url = "http://127.0.0.1:8000/";

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch(url+"api/accept-application/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: applicationId,
          status: newStatus,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        window.location.href = "/posted-jobs";
      } else {
        alert(data.error || "Failed to update application status.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch(`${url}api/job-candidates/?job_id=${jobId}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setCandidates(data.message); // assuming data is { message: [ ... ] }
          setJobTitle(""); // adjust this based on your serializer
        } else {
          setCandidates([]);
          setJobTitle("");
        }
      } catch (error) {
        alert(`Some error occurred: ${error}`);
      }
    };

    fetchCandidates();
  }, [jobId]);

  return (
    <div className="candidates-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>
      <h2>Candidates Applied for: {jobTitle || "Unknown Job"}</h2>
      {candidates?.length === 0 ? (
        <p>No candidates have applied for this job yet.</p>
      ) : (
        <ul className="candidate-list">
          {candidates?.map((candidate) => (
            <li key={candidate.id} className="candidate-card">
              <h3>{candidate.candidate.user.username.toUpperCase()}</h3>
              <p>
                <strong>Email:</strong> {candidate.candidate.user.email}
              </p>
              <p>
                <strong>Location:</strong> {candidate.candidate.city},{" "}
                {candidate.candidate.state}
              </p>
              <p>
                <strong>Qualification:</strong>{" "}
                {candidate.candidate.qualification}
              </p>
              <p>
                <strong>School:</strong> {candidate.candidate.school}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={`http://127.0.0.1:8000${candidate.candidate.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "black" }}
                >
                  Download {candidate.candidate.resume}
                </a>
              </p>

              <button
                style={{
                  margin: "10px",
                  backgroundColor: "#007aff",
                  padding: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => updateApplicationStatus(candidate.id, "Accepted")}
              >
                Accept
              </button>
              <button
                style={{
                  margin: "10px",
                  backgroundColor: "red",
                  padding: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => updateApplicationStatus(candidate.id, "Rejected")}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowCandidates;
