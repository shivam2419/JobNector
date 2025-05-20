import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const backendUrl = "http://127.0.0.1:8000";

const EditJob = () => {
  const { jobId } = useParams(); 
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    recruiter: "",       // recruiter id
    title: "",
    min_salary: "",
    max_salary: "",
    salary_type: "",
    duration: "",
    description: "",
    skills: "",          // comma separated string
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details and recruiters on mount
  useEffect(() => {
    const fetchJobAndRecruiters = async () => {
      try {
        const [jobRes, recRes] = await Promise.all([
          fetch(`${backendUrl}/api/create-job/${jobId}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }),
          fetch(`${backendUrl}/api/recruiter/`, { // adjust this URL based on your recruiters endpoint
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }),
        ]);
        console.log(jobRes.status)
        if (jobRes.status !== 200) throw new Error("Failed to fetch job details");
        if (recRes.status !== 200) throw new Error("Failed to fetch recruiters");

        const jobJson = await jobRes.json();


        setJobData({
          recruiter: jobJson.recruiter || "",
          title: jobJson.title || "",
          min_salary: jobJson.min_salary || "",
          max_salary: jobJson.max_salary || "",
          salary_type: jobJson.salary_type || "",
          duration: jobJson.duration || "",
          description: jobJson.description || "",
          skills: (jobJson.skills && jobJson.skills.join(", ")) || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJobAndRecruiters();
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data: convert skills string to array of trimmed skills
    const payload = {
      ...jobData,
      min_salary: parseInt(jobData.min_salary, 10),
      max_salary: parseInt(jobData.max_salary, 10),
      skills: jobData.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
    };

    try {
      const response = await fetch(`${backendUrl}/api/create-job/${jobId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      alert("Job updated successfully!");
      navigate("/recruiter-dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "25px", color: "#333", textAlign: "center" }}>
        Edit Job
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Recruiter Dropdown */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="recruiter"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Recruiter
          </label>
          <input
            id="recruiter"
            name="recruiter"
            value={localStorage.getItem("username").toUpperCase()}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            disabled
          >
          </input>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            placeholder="Enter job title"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Min Salary */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="min_salary"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Minimum Salary
          </label>
          <input
            type="number"
            id="min_salary"
            name="min_salary"
            value={jobData.min_salary}
            onChange={handleChange}
            required
            placeholder="Enter minimum salary"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            min={0}
          />
        </div>

        {/* Max Salary */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="max_salary"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Maximum Salary
          </label>
          <input
            type="number"
            id="max_salary"
            name="max_salary"
            value={jobData.max_salary}
            onChange={handleChange}
            required
            placeholder="Enter maximum salary"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            min={jobData.min_salary || 0}
          />
        </div>

        {/* Salary Type */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="salary_type"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Salary Type
          </label>
          <input
            type="text"
            id="salary_type"
            name="salary_type"
            value={jobData.salary_type}
            onChange={handleChange}
            placeholder="e.g. Per Month, Per Year"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Duration */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="duration"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            placeholder="Enter duration (e.g. 6 months)"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Enter job description"
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              resize: "vertical",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "30px" }}>
          <label
            htmlFor="skills"
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#555",
            }}
          >
            Skills (comma separated)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
            placeholder="e.g. React, Django, Python"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1.5px solid #ccc",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 0",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
