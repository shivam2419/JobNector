import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./components/Home";
import { HomeCandidate } from "./components/candidate/HomeCandidate";
import { RecruiterFormWizard } from "./components/recruiter/RecruiterFormWizard";
import RecruiterHome from "./components/recruiter/RecruiterHome";
import PostJob from "./components/recruiter/PostJob";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/candidate" element={<HomeCandidate />} />
        <Route path="/recruiter" element={<RecruiterHome/>}/>
        <Route path="/post-job" element={<PostJob/>}/>
      </Route>
      <Route path="/register" element={<RecruiterFormWizard/>} />
    </Routes>
  </Router>
);

export default App;
