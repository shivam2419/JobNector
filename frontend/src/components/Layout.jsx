// Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import RecruiterNavbar from './recruiter/RecruiterNavbar';

const Layout = () => {
  const location = useLocation();

  // Define all recruiter routes that should use the RecruiterNavbar
  const recruiterPaths = [
    '/recruiter',
    '/post-job',
    '/posted-jobs',
    '/job-candidates',
    '/recruiter-dashboard',
    '/edit-job'
  ];

  // Check if the current pathname starts with any recruiter path
  const isRecruiterRoute = recruiterPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {isRecruiterRoute ? <RecruiterNavbar /> : <Navbar />}
      <Outlet />
      {isRecruiterRoute ? "" : <Footer />}
    </>
  );
};

export default Layout;
