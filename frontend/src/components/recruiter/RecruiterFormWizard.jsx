import React, { useState } from "react";
import "../../style/recruiter/RecruiterFormWizard.css"; // Make sure to create this CSS file

export const RecruiterFormWizard = () => {
  const url = "https://jobnector.onrender.com/";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
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
      const userResponse = await fetch(url + "api/user/", {
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
        alert("Failed to create user: " + JSON.stringify(errorData));
        return;
      }

      const userData = await userResponse.json();

      const usertype = await fetch(url + "api/usertype/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData.id,
          is_candidate: false,
          is_recruiter: true,
        }),
      });

      if (!usertype.ok) {
        alert("Error in creating usertype");
        return;
      }

      const recruiterData = new FormData();
      recruiterData.append("user", userData.id);
      recruiterData.append("phone_number", formData.mobile);
      recruiterData.append("city", formData.city);
      recruiterData.append("state", formData.state);
      recruiterData.append("country", formData.country);
      recruiterData.append("company_name", formData.company_name);
      recruiterData.append("designation", formData.designation);

      const candidateResponse = await fetch(url + "api/recruiter/", {
        method: "POST",
        body: recruiterData,
      });

      if (!candidateResponse.ok) {
        const errorData = await candidateResponse.json();
        alert("Failed to create recruiter profile: " + JSON.stringify(errorData));
        return;
      }

      alert("Recruiter created successfully! You can now login");
      window.location.href = "/recruiter";
    } catch (error) {
      console.error(error);
      alert("Some Error occurred");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecruiter();
  };

  return (
    <div className="form-container">
      <h1>Recruiter Registration</h1>

      <div className="step-tabs">
        <span className={step === 1 ? "active" : ""}>1. Personal</span>
        <span className={step === 2 ? "active" : ""}>2. Company</span>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h3>Personal Details</h3>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
            <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />

            <div className="button-row">
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Organization Details</h3>
            <input name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required />
            <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />

            <div className="button-row">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
