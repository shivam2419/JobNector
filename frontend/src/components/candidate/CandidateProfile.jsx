import React, { useEffect, useState } from "react";
import "../../style/Profile.css";

const CandidateProfile = () => {
  const backendUrl = "http://127.0.0.1:8000";
  const [candidate, setCandidate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [updated, setUpdated] = useState(true);
  useEffect(() => {
    fetch(`${backendUrl}/api/get-candidate/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCandidate(data);
        setFormData({ ...data });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.affinda.com/v2/resumes/", {
        method: "POST",
        headers: {
          Authorization: "Bearer aff_65927641514c1df7b1f581e06beee9e3e81b30a8",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Affinda Error:", errorData);
        return;
      }

      const data = await response.json();
      const skills = data.data.skills?.map((s) => s.name || s).filter(Boolean) || [];
      localStorage.setItem("skills", JSON.stringify(skills));
    } catch (err) {
      console.error("Resume upload error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdated(false);
    const allowedFields = [
      "phone_number",
      "city",
      "state",
      "country",
      "qualification",
      "school",
      "pass_out_year",
    ];

    const formToSend = new FormData();

    allowedFields.forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        formToSend.append(key, formData[key]);
      }
    });

    if (resumeFile) {
      formToSend.append("resume", resumeFile);
      await handleResumeUpload(resumeFile); // Wait for parsing to finish
    }

    fetch(
      `${backendUrl}/api/candidate/update_by_user/${localStorage.getItem("user_id")}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: formToSend,
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Profile updated successfully!");
        window.location.reload();
      setUpdated(true);
      })
      .catch((err) => console.error(err));
      setUpdated(true);
  };

  if (!formData || !candidate)
    return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Candidate Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </label>

        <label>
          City:
          <input name="city" value={formData.city} onChange={handleChange} />
        </label>

        <label>
          State:
          <input name="state" value={formData.state} onChange={handleChange} />
        </label>

        <label>
          Country:
          <input name="country" value={formData.country} onChange={handleChange} />
        </label>

        <label>
          Qualification:
          <input name="qualification" value={formData.qualification} onChange={handleChange} />
        </label>

        <label>
          School:
          <input name="school" value={formData.school} onChange={handleChange} />
        </label>

        <label>
          Pass Out Year:
          <input name="pass_out_year" value={formData.pass_out_year} onChange={handleChange} />
        </label>

        <label>
          Upload New Resume: (
          <a
            href={backendUrl + formData.resume}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            Current Resume
          </a>
          )
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </label>

        <button type="submit">{updated ? "Update Profile" : "Updating..."}</button>
      </form>
    </div>
  );
};

export default CandidateProfile;
