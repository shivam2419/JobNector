import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/JobNector.png";
import loader from "../assets/loader.gif";
import "../style/Navbar.css";

export const Navbar = () => {
  const url = "https://jobnector.onrender.com/";
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const toggleJobsDropdown = () => setJobsDropdownOpen(!jobsDropdownOpen);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setAuthenticated(false);
      return;
    }

    fetch(url + "api/get-usertype/8", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("access");
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  return (
    <>
      {loading && (
        <div className="fullscreen-loader">
          <img src={loader} alt="Loading..." />
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="JobNector" />
            <span>JobNector</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="hamburger" onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="close-btn" onClick={toggleSidebar}>
            ×
          </div>
          <Link to="/" onClick={toggleSidebar}>
            Home
          </Link>
          <div className="sidebar-dropdown">
            <div className="dropdown-toggle" onClick={toggleJobsDropdown}>
              Jobs &nbsp; {jobsDropdownOpen ? "▲" : "▼"}
            </div>
            {jobsDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/jobs/tech" onClick={toggleSidebar}>
                  Tech Jobs
                </Link>
                <Link to="/jobs/design" onClick={toggleSidebar}>
                  Design Jobs
                </Link>
                <Link to="/jobs/marketing" onClick={toggleSidebar}>
                  Marketing Jobs
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" onClick={toggleSidebar}>
            About
          </Link>
          {authenticated ? (
              <>
                <button onClick={logout} className="sidebar-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login-signup" className="sidebar-login-btn">
                Login
              </Link>
            )}
        </div>
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li
            className="navbar-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Jobs</span>
            <ul
              className={`navbar-dropdown-menu ${
                dropdownOpen ? "dropdown-active" : ""
              }`}
            >
              <li>
                <Link to="#">Noida</Link>
              </li>
              <li>
                <Link to="#">Delhi</Link>
              </li>
              <li>
                <Link to="#">Gurugram</Link>
              </li>
              <li>
                <Link to="#">Bangalore</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <div className="navbar-actions">
            {authenticated ? (
              <>
                <Link to="/notification" className="navbar-notif-icon">
                  <img
                    src="https://static-00.iconduck.com/assets.00/notification-icon-923x1024-wyajkziy.png"
                    alt="Notifications"
                  />
                </Link>
                <Link to="/profile" className="navbar-profile-pic">
                  <img
                    src={
                      localStorage.getItem("profile") ||
                      "https://cdn-icons-png.flaticon.com/512/7915/7915522.png"
                    }
                    alt="Profile"
                  />
                </Link>
                <button onClick={logout} className="navbar-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login-signup" className="navbar-login-btn">
                Login
              </Link>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};
