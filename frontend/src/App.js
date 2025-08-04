import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import { HomeCandidate } from "./components/candidate/HomeCandidate";
import { RecruiterFormWizard } from "./components/recruiter/RecruiterFormWizard";
import RecruiterHome from "./components/recruiter/RecruiterHome";
import PostJob from "./components/recruiter/PostJob";
import ShowCandidates from "./components/recruiter/ShowCandidates ";
import PostedJobs from "./components/recruiter/PostedJobs";
import { CandidateFormWizard } from "./components/candidate/CandidateFormWizard";
import JobDetails from "./components/candidate/JobDetails";
import PrivateRoute from "./components/PrivateRoute";
import Notification  from "./components/candidate/Notification";
import RecruiterDashboard from "./components/recruiter/RecruiterDashboard";
import EditJob from "./components/recruiter/EditJob";
import RecruiterProfile from "./components/recruiter/RecruiterProfile";
import CandidateProfile from "./components/candidate/CandidateProfile";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login-signup' element={<LoginSignup />} />
        {/* Protected routes wrapped with PrivateRoute */}
        <Route element={<PrivateRoute />}>
        {/* Candidate  pages from here */}
          <Route path="/candidate" element={<HomeCandidate />} />
          <Route path="/jobdetails/:job_id" element={<JobDetails />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<CandidateProfile />} />
          {/* Recuiter pages from here */}
          <Route path="/recruiter" element={<RecruiterHome />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/posted-jobs" element={<PostedJobs />} />
          <Route path="/job-candidates/:jobId" element={<ShowCandidates />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/edit-job/:jobId" element={<EditJob />} />
          <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        </Route>
      </Route>

      {/* Public register routes */}
      <Route path="/register/candidate" element={<CandidateFormWizard />} />
      <Route path="/register" element={<RecruiterFormWizard />} />
    </Routes>
  </Router>
);


export default App;
