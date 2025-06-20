import React, { useState } from "react";
import "../../style/recruiter/PostJob.css";
import loader from "../../assets/loader.gif"; // Correct import for loader GIF

const PostJob = () => {
  const url = "https://jobnector.onrender.com/";
  const [loading, setLoading] = useState(false); // loader state
  const [formData, setFormData] = useState({
    title: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "per month",
    duration: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchRecruiterProfile = async () => {
    const res = await fetch(url + "api/get-recruiter/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const postJob = async () => {
    setLoading(true); // start loader
    try {
      const recruiterData = await fetchRecruiterProfile();

      const token = localStorage.getItem("access");
      const jobPayload = {
        recruiter: recruiterData.id,
        title: formData.title,
        min_salary: parseInt(formData.minSalary),
        max_salary: parseInt(formData.maxSalary),
        salary_type: formData.salaryType,
        duration: formData.duration,
        description: formData.description,
      };

      const response = await fetch(url + "api/create-job/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobPayload),
      });

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          minSalary: "",
          maxSalary: "",
          salaryType: "per month",
          duration: "",
          description: "",
        });
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Failed to post job");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false); // stop loader
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postJob();
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img src={loader} alt="Loading..." style={{ width: "80px" }} />
        </div>
      ) : (
        <form className="post-job-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="salary-range-group">
            <input
              type="number"
              name="minSalary"
              placeholder="Min Salary (₹)"
              value={formData.minSalary}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="maxSalary"
              placeholder="Max Salary (₹)"
              value={formData.maxSalary}
              onChange={handleChange}
              required
            />
            <select
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
            >
              <option value="per month">Per Month</option>
              <option value="per year">Per Year</option>
              <option value="per week">Per Week</option>
              <option value="one time">One Time</option>
            </select>
          </div>

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 6 months)"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PostJob;
