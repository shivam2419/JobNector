import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style/recruiter/ShowCandidates.css";
import loader from "../../assets/loader.gif"; // Make sure the path is correct

// Icons (can also use react-icons if preferred)
import { MdEmail, MdLocationOn, MdSchool, MdDescription } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";

const ShowCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const url = "https://jobnector.onrender.com";

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(url + "/api/accept-application/", {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch(`${url}/api/job-candidates/?job_id=${jobId}`);
        const data = await res.json();
        if (res.ok) {
          setCandidates(data.message);
          if (data.message.length > 0) {
            setJobTitle(data.message[0].job.title);
          } // Can be set if API provides job title
        } else {
          setCandidates([]);
        }
      } catch (error) {
        alert(`Some error occurred: ${error}`);
      } finally {
        setLoading(false);
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

      {loading ? (
        <div className="fullscreen-loader">
          <img src={loader} alt="Loading..." />
        </div>
      ) : candidates?.length === 0 ? (
        <p>No candidates have applied for this job yet.</p>
      ) : (
        <ul className="candidate-list">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="candidate-card">
              <h3>{candidate.candidate.user.username.toUpperCase()}</h3>

              <p>
                <MdEmail
                  style={{ verticalAlign: "middle", marginRight: "6px" }}
                />
                <strong>Email:</strong> {candidate.candidate.user.email}
              </p>

              <p>
                <MdLocationOn
                  style={{ verticalAlign: "middle", marginRight: "6px" }}
                />
                <strong>Location:</strong> {candidate.candidate.city},{" "}
                {candidate.candidate.state}
              </p>

              <p>
                <FaUserGraduate
                  style={{ verticalAlign: "middle", marginRight: "6px" }}
                />
                <strong>Qualification:</strong>{" "}
                {candidate.candidate.qualification}
              </p>

              <p>
                <MdSchool
                  style={{ verticalAlign: "middle", marginRight: "6px" }}
                />
                <strong>School:</strong> {candidate.candidate.school}
              </p>

              <p>
                <MdDescription
                  style={{ verticalAlign: "middle", marginRight: "6px" }}
                />
                <strong>Resume:</strong>{" "}
                <a
                  href={`${url}${candidate.candidate.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  See Resume
                </a>
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    margin: "6px",
                    backgroundColor: "#007aff",
                    padding: "10px",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() =>
                    updateApplicationStatus(candidate.id, "Accepted")
                  }
                >
                  Accept
                </button>

                <button
                  style={{
                    margin: "6px",
                    backgroundColor: "red",
                    padding: "10px",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() =>
                    updateApplicationStatus(candidate.id, "Rejected")
                  }
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowCandidates;
