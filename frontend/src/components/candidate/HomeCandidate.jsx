import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/candidate/Home.css";
import loader from "../../assets/loader.gif";

const cleanSkill = (skill) =>
  skill.toLowerCase().replace(/\s*\(.*?\)\s*/g, "").trim();

export const HomeCandidate = () => {
  const username = localStorage.getItem("username");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://jobnector.onrender.com/";

  const fetchJobs = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${url}api/get-jobs/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setRecommendedJobs(data);
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      alert(`Error occurred: ${error}`);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  useEffect(() => {
    fetchJobs();

    const storedSkillsRaw = localStorage.getItem("skills");
    let storedSkills = [];
    try {
      storedSkills = storedSkillsRaw ? JSON.parse(storedSkillsRaw) : [];
      const cleanedSkills = storedSkills.map((skill) => cleanSkill(skill));
      setKeywords(cleanedSkills);
    } catch (e) {
      console.error("Failed to parse skills from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (recommendedJobs.length > 0 && keywords.length > 0) {
      const cleanedKeywords = keywords.map(cleanSkill);

      const filtered = recommendedJobs
        .filter((job) => {
          let jobSkillsArray = [];
          if (typeof job.skills === "string") {
            jobSkillsArray = job.skills.split(",").map((s) => cleanSkill(s));
          } else if (Array.isArray(job.skills)) {
            jobSkillsArray = job.skills.map((s) => cleanSkill(s));
          }

          if (jobSkillsArray.length === 0) return false;

          return jobSkillsArray.some((skill) =>
            cleanedKeywords.some(
              (keyword) =>
                skill.includes(keyword) || keyword.includes(skill)
            )
          );
        })
        .map((job) => {
          let jobSkillsArray = [];
          if (typeof job.skills === "string") {
            jobSkillsArray = job.skills.split(",").map((s) => cleanSkill(s));
          } else if (Array.isArray(job.skills)) {
            jobSkillsArray = job.skills.map((s) => cleanSkill(s));
          }

          const matchedSkills = jobSkillsArray.filter((skill) =>
            cleanedKeywords.some(
              (keyword) =>
                skill.includes(keyword) || keyword.includes(skill)
            )
          );
          return { ...job, matchedSkills };
        });

      setFilteredJobs(filtered);
    }
  }, [recommendedJobs, keywords]);

  const trending = [
    {
      id: 1,
      type: "Certification course",
      heading: "Master the in Demand Skills!",
      desc: "Get certified and level-up your resume",
      link: "/candidate",
    },
    {
      id: 2,
      type: "Training",
      heading: "When the summer starts to sizzle, Be prepared not to fizzle",
      desc: "Get 55%+10% OFF on online summer trainings",
      link: "/candidate",
    },
    {
      id: 3,
      type: "Internships",
      heading: "Mega Internship Sprint",
      desc: "Apply everyday to unlock premium internships",
      link: "/candidate",
    },
  ];
  const formatUsername = (username) => {
  return username
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join words back
};
  return (
    <div>
      <div className="candidate-home-container">
        <h1>Hi, {formatUsername(username)}!👋</h1>
        <p>Let's help you and your dream career</p>
        <h2>
          Trending on Job<span style={{ color: "orange" }}>Nector</span>🔥
        </h2>
        <div className="trending-slider-container">
          {trending.map((job) => (
            <div key={job.id} className="trending-card">
              <span>
                <p>{job.type}</p>
              </span>
              <h3>{job.heading}</h3>
              <p>{job.desc}</p>
              <Link to={job.link}></Link>
              <button>
                <Link to={job.link}>Know more</Link>
              </button>
            </div>
          ))}
        </div>

        <h2>Recommended for you</h2>
        <p>
          as per your <span style={{ color: "blue" }}>Preferences</span>
        </p>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img src={loader} alt="Loading..." style={{ width: "100px" }} />
            <p>Loading recommended jobs for you...</p>
          </div>
        ) : (
          <div className="slider-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <span className="badge">Actively hiring</span>
                  <br />
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company}</p>
                  <hr />
                  <p>
                    📍 {job.recruiter_details?.city},{" "}
                    {job.recruiter_details?.state},{" "}
                    {job.recruiter_details?.country}
                  </p>
                  <p>
                    💰 Rs. {job.min_salary} - Rs. {job.max_salary} /{" "}
                    {job.salary_type}
                  </p>
                  <p>🕒 {job.duration}</p>
                  {job.matchedSkills && job.matchedSkills.length > 0 && (
                    <p>
                      Matched Skills:{" "}
                      {job.matchedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          style={{ marginRight: "5px", color: "green" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="job-card-footer">
                    <Link to={`/jobdetails/${job.id}`}>View details</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No matching jobs found based on your skills.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
