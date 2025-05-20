import React, { useEffect, useState } from "react";
import "../../style/Profile.css";

const RecruiterProfile = () => {
  const backendUrl = "https://jobnector.onrender.com";
  const [recruiter, setRecruiter] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    city: "",
    state: "",
    country: "",
    designation: "",
    phone_number: ""
  });

  useEffect(() => {
    fetch(`${backendUrl}/api/get-recruiter/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecruiter(data);
        setFormData({
          company_name: data.company_name || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          designation: data.designation || "",
          phone_number: data.phone_number || "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/api/recruiter/${recruiter.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        ...formData,
        user: recruiter.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Profile updated successfully!");
        setRecruiter(data);
      })
      .catch((err) => console.error(err));
  };

  if (!recruiter) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Recruiter Profile</h2>

      <form onSubmit={handleUpdate}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={recruiter.user?.username}
          disabled
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={recruiter.user?.email}
          disabled
        />
        <label>Company Name</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />

        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        <label>Phone number</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default RecruiterProfile;
