import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/candidate/Home.css";
import logo from "../../assets/JobNector.png"
export const HomeCandidate = () => {
  const username = localStorage.getItem("username");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const url = "http://127.0.0.1:8000/";
  const fetchJobs  = async () => {
    try {
      const response = await fetch(`${url}api/get-jobs/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if(response.ok) {
        setRecommendedJobs(data);
      } else {
        alert("Some error occured");
      }
    } catch(error) {
      alert(`error occured ${error}`)
    } 
  }
  useEffect(()=> {
    fetchJobs();
  }, [])
  const trending = [
    {
      id: 1,
      type: "Certification course",
      heading: "Master the in Demand Skills!",
      desc: "Get certified and level-up you resume",
      link: "/",
    },
    {
      id: 2,
      type: "Training",
      heading: "When the summer starts to sizzle, Be prepared not to fizzle",
      desc: "Get 55%+10% OFF on online summer trainings",
      link: "/",
    },
    {
      id: 3,
      type: "Internships",
      heading: "Mega Internship Sprint",
      desc: "Apply everyday to unlock premium internships",
      link: "/",
    },
  ];
  return (
    <div>
      <div className="candidate-home-container">
        <h1>Hi, {username}!👋</h1>
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
                <Link>Know more</Link>
              </button>
            </div>
          ))}
        </div>
        <h2>Recommended for you</h2>
        <p>
          as per your <span style={{ color: "blue" }}>Preferences</span>
        </p>
        <div className="slider-container">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <span className="badge">Actively hiring</span>
                <img src={job.logo ? job.logo : logo} alt="logo" className="company-logo" />
              </div>
              <h3>{job.title}</h3>
              <p className="company-name">{job.company}</p>
              <hr />
              <p>📍 {job.recruiter_details?.city}, {job.recruiter_details?.state}, {job.recruiter_details?.country}</p>
              <p>💰 Rs. {job.min_salary} - Rs. {job.max_salary} / {job.salary_type}</p>
              <p>🕒 {job.duration}</p>
              <div className="job-card-footer">
                <span className="tag">Internship</span>
                <a href={`/jobdetails/${job.id}`}>View details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
