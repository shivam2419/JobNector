import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./components/Home";
import { HomeCandidate } from "./components/candidate/HomeCandidate";
import { RecruiterFormWizard } from "./components/recruiter/RecruiterFormWizard";
import RecruiterHome from "./components/recruiter/RecruiterHome";
import PostJob from "./components/recruiter/PostJob";
import ShowCandidates from "./components/recruiter/ShowCandidates ";
import PostedJobs from "./components/recruiter/PostedJobs";
import { CandidateFormWizard } from "./components/candidate/CandidateFormWizard";
import JobDetails from "./components/candidate/JobDetails";
import PrivateRoute from "./components/PrivateRoute"
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Protected routes wrapped with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/candidate" element={<HomeCandidate />} />
          <Route path="/jobdetails" element={<JobDetails />} />
          <Route path="/recruiter" element={<RecruiterHome />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/posted-jobs" element={<PostedJobs />} />
          <Route path="/candidates/:jobId" element={<ShowCandidates />} />
        </Route>
      </Route>

      {/* Public register routes */}
      <Route path="/register/candidate" element={<CandidateFormWizard />} />
      <Route path="/register" element={<RecruiterFormWizard />} />
    </Routes>
  </Router>
);


export default App;
