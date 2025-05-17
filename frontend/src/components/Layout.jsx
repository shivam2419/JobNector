// Layout.jsx
import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
const Layout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This will render the current route's component */}
    <Footer />
  </>
);

export default Layout;
