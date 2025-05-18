import React from "react";
import "../../style/candidate/JobDetails.css";
const JobDetails = () => {
  return (
    <div className="job-container">
      <div className="job-title">Django Developer Intern</div>
      <div className="company-name">TechNova Pvt Ltd</div>
      <div className="location">Remote</div>

      <div className="job-info">
        <div>
          <span className="section-title">Stipend</span>
          <br />
          ₹10,000/month
        </div>
        <div>
          <span className="section-title">Duration</span>
          <br />3 months
        </div>
        <div>
          <span className="section-title">Type</span>
          <br />
          Internship
        </div>
      </div>

      <div>
        <div className="section-title">Required Skills:</div>
        <ul>
          <li>Python</li>
          <li>Django</li>
          <li>REST API</li>
          <li>Git</li>
        </ul>
      </div>

      <div>
        <div className="section-title">Job Description:</div>
        <div className="section-content">
          We are seeking a Django Developer Intern to join our backend team...
        </div>
      </div>

      <div>
        <div className="section-title">Perks:</div>
        <ul>
          <li>Certificate</li>
          <li>Letter of Recommendation</li>
          <li>Flexible Hours</li>
        </ul>
      </div>

      <button className="apply-button">Apply Now</button>
    </div>
  );
};

export default JobDetails;
