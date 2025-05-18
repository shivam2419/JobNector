import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/candidate/Home.css";
export const HomeCandidate = () => {
  const username = localStorage.getItem("username");
  const recommendedJobs = [
    {
      id: 1,
      title: "Mern Stack Developer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 2,
      title: "Full Stack developer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 3,
      title: "Data analyst",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 4,
      title: "Content writer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 6,
      title: "Django developer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 7,
      title: "ML Engineer",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
    {
      id: 8,
      title: "Cloud analyst",
      company: "Meta",
      location: "Chandigarh, India",
      salary: "20,000-40,000/month",
      duration: "4 months",
      type: "Internship",
      logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_960_720.png",
    },
  ];
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
                <img src={job.logo} alt="logo" className="company-logo" />
              </div>
              <h3>{job.title}</h3>
              <p className="company-name">{job.company}</p>
              <hr />
              <p>📍 {job.location}</p>
              <p>💰 {job.salary}</p>
              <p>🕒 {job.duration}</p>
              <div className="job-card-footer">
                <span className="tag">Internship</span>
                <a href="/jobdetails">View details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
