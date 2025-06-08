import React, { useState } from "react";
import "../../style/candidate/CandidateFormWizard.css";

export const CandidateFormWizard = () => {
  const url = "https://jobnector.onrender.com/";
  const [step, setStep] = useState(1);
  const [parsing, setParsing] = useState(false);
  const [parsingError, setParsingError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    qualification: "",
    school: "",
    pass_year: "",
    city: "",
    state: "",
    country: "",
    resume: null,
    password: "", // ← Add this line
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "resume" && files && files[0]) {
      const file = files[0];
      // Call the Affinda parsing API to parse the resume and get skills
      await handleResumeUpload(file);
    } else {
      // Normal form input update for other fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleResumeUpload = async (file) => {
    setParsing(true);
    setParsingError(null);

    try {
      const formDataForParse = new FormData();
      formDataForParse.append("file", file);

      const response = await fetch("https://api.affinda.com/v2/resumes/", {
        method: "POST",
        headers: {
          Authorization: "Bearer aff_65927641514c1df7b1f581e06beee9e3e81b30a8",
        },
        body: formDataForParse,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setParsingError(
          "Failed to parse resume: " +
            (errorData.message || response.statusText)
        );
        setParsing(false);
        return;
      }

      const data = await response.json();
      // Extract skills from Affinda response
      const skills = data.data.skills
        ? data.data.skills.map((s) => s.name || s).filter(Boolean)
        : [];

      // Update formData with resume file and extracted keywords
      setFormData((prev) => ({
        ...prev,
        resume: file,
        extracted_keywords: skills,
      }));
    } catch (err) {
      setParsingError("Error parsing resume: " + err.message);
    } finally {
      setParsing(false);
    }
  };
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const createCandidate = async () => {
    console.log(formData);
    formData.firstName = formData.firstName.trimEnd();
    formData.lastName = formData.lastName.trimEnd();
    const username =
      formData.firstName.toLowerCase() + "_" + formData.lastName.toLowerCase();
    try {
      // Creating user
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
        console.error("User creation failed:", errorData); // 🔍 Logs error reason
        alert("Failed to create user: " + JSON.stringify(errorData));
        console.log(formData);
        return;
      }

      const userData = await userResponse.json();
      const usertype = await fetch(url + "api/usertype/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData.id,
          is_candidate: true,
          is_recruiter: false,
        }),
      });
      if (!usertype.ok) {
        alert("Error in creating usertype");
        return;
      }
      // Now create Candidate profile with user id and FormData (for file upload)
      const candidateData = new FormData();
      candidateData.append("user", userData.id); // Assuming you use user ID here
      candidateData.append("phone_number", formData.mobile);
      candidateData.append("city", formData.city);
      candidateData.append("state", formData.state);
      candidateData.append("country", formData.country);
      candidateData.append("qualification", formData.qualification);
      candidateData.append("school", formData.school);
      candidateData.append("pass_out_year", formData.pass_year);
      candidateData.append("resume", formData.resume);
      // If you want to add extracted_keywords, append as JSON string
      candidateData.append(
        "extracted_keywords",
        JSON.stringify(formData.extracted_keywords || [])
      );

      const candidateResponse = await fetch(url + "api/candidate/", {
        method: "POST",
        body: candidateData,
      });
      if (!candidateResponse.ok) {
        const errorData = await candidateResponse.json();
        console.error("User creation failed:", errorData); // 🔍 Logs error reason
        alert(
          "Failed to create candidate profile: " + JSON.stringify(errorData)
        );
        console.log(candidateData);
        return;
      }

      alert("Candidate created successfully! You can now login");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Some Error occured");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Creating candidate
    createCandidate();
  };

  return (
  <div className="form-container">
    <h1>Candidate Registration Form</h1>

    <div className="step-tabs">
      <span className={step === 1 ? "active" : ""}>1. Personal Info</span>
      <span className={step === 2 ? "active" : ""}>2. Education & Skills</span>
      <span className={step === 3 ? "active" : ""}>3. Resume & Submit</span>
    </div>

    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <h3>Personal Info</h3>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <div className="button-row">
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Education & Skills</h3>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          >
            <option value="">Select Highest Qualification</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="Diploma">Diploma</option>
            <option value="B.Tech / B.E.">B.Tech / B.E.</option>
            <option value="M.Tech / M.E.">M.Tech / M.E.</option>
            <option value="B.Sc / M.Sc">B.Sc / M.Sc</option>
            <option value="BCA / MCA">BCA / MCA</option>
            <option value="MBA / PGDM">MBA / PGDM</option>
            <option value="Other">Other</option>
          </select>
          <input
            name="school"
            placeholder="College/University"
            value={formData.school}
            onChange={handleChange}
            required
          />
          <input
            name="pass_year"
            placeholder="Graduation Year"
            value={formData.pass_year}
            onChange={handleChange}
            required
          />
          <div className="button-row">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Resume & Submit</h3>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />
          {parsing && <p>Parsing resume, please wait...</p>}
          {parsingError && <p style={{ color: "red" }}>{parsingError}</p>}

          <div className="button-row">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit">
              {parsing ? "Extracting..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </form>
  </div>
);

};
