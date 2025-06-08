import { Outlet, useLocation, matchPath } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import RecruiterNavbar from './recruiter/RecruiterNavbar';

const Layout = () => {
  const location = useLocation();

  // Recruiter-only routes (which show RecruiterNavbar)
  const recruiterPaths = [
    '/recruiter',
    '/post-job',
    '/posted-jobs',
    '/job-candidates',
    '/recruiter-dashboard',
    '/edit-job/:id'
  ];

  // Routes where Footer should be hidden
  const noFooterPaths = [
    'candidate',
    '/jobdetails/:job_id'
  ];

  const isRecruiterRoute = recruiterPaths.some(path =>
    matchPath({ path, end: false }, location.pathname)
  );

  const hideFooter = noFooterPaths.some(path =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <>
      {isRecruiterRoute ? <RecruiterNavbar /> : <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
