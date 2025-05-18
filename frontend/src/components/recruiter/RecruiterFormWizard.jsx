import React, { useState } from "react";

export const RecruiterFormWizard = () => {
  const url = "https://jobnector.onrender.com/";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    company_name: "",
    designation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const createRecruiter = async () => {
    formData.firstName = formData.firstName.trimEnd();
    formData.lastName = formData.lastName.trimEnd();
    const username =
      formData.firstName.toLowerCase() + "_" + formData.lastName.toLowerCase();
    try {
      // Creating user
      const userResponse = await fetch(url+"api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error("User creation failed:", errorData); // 🔍 Logs error reason
        alert("Failed to create user: " + JSON.stringify(errorData));
        console.log(formData);
        return;
      }
      const userData = await userResponse.json();
      // Now create Candidate profile with user id and FormData (for file upload)
      const recruiterData = new FormData();
      recruiterData.append("user", userData.id); // Assuming you use user ID here
      recruiterData.append("phone_number", formData.mobile);
      recruiterData.append("city", formData.city);
      recruiterData.append("state", formData.state);
      recruiterData.append("country", formData.country);
      recruiterData.append("company_name", formData.company_name);
      recruiterData.append("designation", formData.designation);

      const candidateResponse = await fetch(
        url+"api/recruiter/",
        {
          method: "POST",
          body: recruiterData,
        }
      );
      if (!candidateResponse.ok) {
        const errorData = await candidateResponse.json();
        console.error("User creation failed:", errorData); // 🔍 Logs error reason
        alert(
          "Failed to create recruiter profile: " + JSON.stringify(errorData)
        );
        console.log(recruiterData);
        return;
      }

      alert("Recruiter created successfully! You can now login");
      window.location.href = "/recruiter";
    } catch (error) {
      console.error(error);
      alert("Some Error occured");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Creating candidate
    createRecruiter();
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            padding: "10px",
            borderBottom: step === 1 ? "2px solid blue" : "1px solid gray",
          }}
        >
          1. Personal Details
        </span>
        <span
          style={{
            padding: "10px",
            borderBottom: step === 2 ? "2px solid blue" : "1px solid gray",
          }}
        >
          2. Organization Details
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: "40px" }}>Personal Details</h3>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
            />
            <br />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
            />
            <br />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <br />
            <input
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <br />
            <input
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <br />
            <button
              type="button"
              onClick={nextStep}
              style={{
                backgroundColor: "#1e88e5",
                border: "none",
                padding: "8px",
                width: "100px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: "40px" }}>Organization Details</h3>
            <input
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
            />
            <br />
            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
            />
            <br />
            <button
              type="button"
              onClick={prevStep}
              style={{
                backgroundColor: "#1e88e5",
                border: "none",
                padding: "8px",
                width: "100px",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              Back
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#1e88e5",
                border: "none",
                padding: "8px",
                width: "100px",
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
