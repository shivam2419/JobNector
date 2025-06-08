import { useNavigate } from "react-router-dom"; // at the top
import React, { useEffect, useState } from "react";
import "../../style/Profile.css";
import loader from "../../assets/loader.gif";
import { FaBuilding, FaUserTie, FaPhone, FaCity, FaFlag, FaMapMarkerAlt, FaUser, FaEnvelope } from "react-icons/fa";

const RecruiterProfile = () => {
  const backendUrl = "https://jobnector.onrender.com";
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      .then((res) => {
        if (res.status === 401) {
          navigate(''); // redirect to login
          return null;
        }
        return res.json();
      })
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <div className="profile-container">
        <center><img src={loader} alt="Loading..." style={{ width: "80px" }} /></center>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Recruiter Profile</h2>

      <form onSubmit={handleUpdate}>
        <label><FaUser /> Username</label>
        <input type="text" value={recruiter.user?.username} disabled />

        <label><FaEnvelope /> Email</label>
        <input type="text" value={recruiter.user?.email} disabled />

        <label><FaBuilding /> Company Name</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
        />

        <label><FaUserTie /> Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        <label><FaPhone /> Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <label><FaCity /> City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label><FaMapMarkerAlt /> State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label><FaFlag /> Country</label>
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
