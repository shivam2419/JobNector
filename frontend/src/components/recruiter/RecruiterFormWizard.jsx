import React, { useState } from 'react';

export const RecruiterFormWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    company: '',
    designation: '',
    jobTitle: '',
    jobDescription: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!")
    window.location.href = "";
    // You can send this to backend here
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ padding: '10px', borderBottom: step === 1 ? '2px solid blue' : '1px solid gray' }}>1. Personal Details</span>
        <span style={{ padding: '10px',  borderBottom: step === 2 ? '2px solid blue' : '1px solid gray' }}>2. Organization Details</span>
        <span style={{ padding: '10px',  borderBottom: step === 3 ? '2px solid blue' : '1px solid gray' }}>3. Post Job</span>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 style={{fontSize: "40px"}}>Personal Details</h3>
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}} required/><br />
            <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}} required/><br />
            <button type="button" onClick={nextStep} style={{backgroundColor: "#1e88e5", border: "none", padding: "8px", width: "100px", margin: "10px", cursor: "pointer"}}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{fontSize: "40px"}}>Organization Details</h3>
            <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <button type="button" onClick={prevStep} style={{backgroundColor: "#1e88e5", border: "none", padding: "8px", width: "100px", margin: "10px", cursor: "pointer"}}>Back</button>
            <button type="button" onClick={nextStep} style={{backgroundColor: "#1e88e5", border: "none", padding: "8px", width: "100px", margin: "10px", cursor: "pointer"}}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{fontSize: "40px"}}>Post Internship/Job</h3>
            <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} style={{padding: "10px", margin: "10px", width: "100%"}}/><br />
            <button type="button" onClick={prevStep} style={{backgroundColor: "#1e88e5", border: "none", padding: "8px", width: "100px", margin: "10px", cursor: "pointer"}}>Back</button>
            <button type="submit" style={{backgroundColor: "#1e88e5", border: "none", padding: "8px", width: "100px", margin: "10px", cursor: "pointer"}}>Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

