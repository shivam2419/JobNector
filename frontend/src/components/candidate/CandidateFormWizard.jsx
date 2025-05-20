import React, { useState } from "react";

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
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h1>Candidate Registration form</h1>
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
          1. Personal Info
        </span>
        <span
          style={{
            padding: "10px",
            borderBottom: step === 2 ? "2px solid blue" : "1px solid gray",
          }}
        >
          2. Education & Skills
        </span>
        <span
          style={{
            padding: "10px",
            borderBottom: step === 3 ? "2px solid blue" : "1px solid gray",
          }}
        >
          3. Resume & Submit
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: "30px" }}>Personal Info</h3>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />

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
                color: "white",
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: "30px" }}>Education & Skills</h3>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              style={{ padding: "10px", margin: "10px", width: "100%" }}
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
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
            <input
              name="pass_year"
              placeholder="Graduation Year"
              value={formData.pass_year}
              onChange={handleChange}
              style={{ padding: "10px", margin: "10px", width: "100%" }}
              required
            />
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
                color: "white",
              }}
            >
              Back
            </button>
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
                color: "white",
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontSize: "30px" }}>Resume & Submit</h3>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              style={{ padding: "10px", margin: "10px", width: "100%" }}
            />
            {parsing && <p>Parsing resume, please wait...</p>}
            {parsingError && <p style={{ color: "red" }}>{parsingError}</p>}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="button"
                onClick={prevStep}
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  padding: "8px",
                  width: "100px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: "#43a047",
                  border: "none",
                  padding: "8px",
                  width: "100px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
  {parsing ? "Extracting..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
