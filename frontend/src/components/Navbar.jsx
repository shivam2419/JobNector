import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/JobNector.png";
import "../style/Navbar.css";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Navbar = () => {
  const url = "https://jobnector.onrender.com/";
  const [authenticated, setAuthenticated] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
  const token = localStorage.getItem("access");
  if (!token) {
    setAuthenticated(false);
    return;
  }

  fetch(url+"api/get-usertype/8", {
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
    .catch(() => {
      setAuthenticated(false);
    });
}, []);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserType = async () => {
    const userId = localStorage.getItem("user_id");
    const response = await fetch(`${url}api/get-usertype/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return null;
    return await response.json();
  };

  const loginUser = async () => {
    formData.username = formData.username.trimEnd();
    const username = formData.username.replace(/ /g, "_");

    try {
      const response = await fetch(url + "api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + (errorData.detail || "Unknown error"));
        return;
      }

      const data = await response.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("resume_url", data.resume_url);
      localStorage.setItem("skills", JSON.stringify(data.skills));
      alert("Login successful!");

      const userType = await fetchUserType();
      if (userType?.is_candidate) window.location.href = "/candidate";
      if (userType?.is_recruiter) window.location.href = "/recruiter";
    } catch (error) {
      alert("Some error occurred during login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar-container">
        <div className="navbar-logo-section">
          <img src={logo} alt="" />
          <h3><Link to="/">JobNector</Link></h3>
        </div>

        <div className="navbar-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li className="custom-dropdown">
              <div className="label">Jobs</div>
              <ul className="options">
                <li>Jobs in Noida</li>
                <li>Jobs in Delhi</li>
                <li>Jobs in Gurugram</li>
                <li>Jobs in Banglore</li>
              </ul>
            </li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </div>

        <div className="navbar-btns">
          {authenticated ? (
            <div className="navbar-profile">
              <Link to="/notification" style={{ border: "none", margin: 0, padding: 0 }}>
                <img src="https://static-00.iconduck.com/assets.00/notification-icon-923x1024-wyajkziy.png" alt="" />
              </Link>
              <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img
                  src={
                    localStorage.getItem("profile")
                      ? localStorage.getItem("profile")
                      : "https://cdn-icons-png.flaticon.com/512/7915/7915522.png"
                  }
                  alt=""
                />
                {username && <Link to="/profile" style={{backgroundColor: "white", color: "black"}}>{username}</Link>}
              </span>
              <Link onClick={logout} id="logout-btn">
                Logout
              </Link>
            </div>
          ) : (
            <>
              <Link onClick={() => document.getElementById("navbar-login-section").style.display = "flex"} id="navbar-login-btn">Login</Link>
              <Link onClick={() => document.getElementById("navbar-signup-section").style.display = "flex"} id="navbar-register-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* LOGIN SECTION */}
      <div className="nav-login" id="navbar-login-section">
        <div className="nav-login-left">
          <b onClick={() => document.getElementById("navbar-login-section").style.display = "none"}>X</b>
          <span>
            <img src={logo} alt="" />
            <label>JobNector</label>
          </span>
          <div className="nav-login-left-content">
            <h1>Login to Your Account</h1>
            <p>Login using social networks</p>
            <span>
              <i><FaFacebook /></i>
              <i><FaInstagram /></i>
              <i><FaGithub /></i>
              <i><FcGoogle /></i>
            </span>
            <hr />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <br /><br />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
              <br /><br />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>

        <div className="nav-login-right">
          <b onClick={() => document.getElementById("navbar-login-section").style.display = "none"}>X</b>
          <div className="nav-login-right-content">
            <h1>New Here?</h1>
            <p>Sign up and discover a great amount of new opportunity</p>
            <button>
              <Link
                onClick={() => {
                  document.getElementById("navbar-login-section").style.display = "none";
                  document.getElementById("navbar-signup-section").style.display = "flex";
                }}
              >
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* SIGNUP SECTION */}
      <div className="nav-signup" id="navbar-signup-section">
        <div className="nav-signup-right">
          <b onClick={() => document.getElementById("navbar-signup-section").style.display = "none"}>X</b>
          <div className="nav-signup-right-content">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info.</p>
            <button>
              <Link
                onClick={() => {
                  document.getElementById("navbar-login-section").style.display = "flex";
                  document.getElementById("navbar-signup-section").style.display = "none";
                }}
              >
                Sign In
              </Link>
            </button>
          </div>
        </div>

        <div className="nav-signup-left">
          <b onClick={() => document.getElementById("navbar-signup-section").style.display = "none"}>X</b>
          <span>
            <img src={logo} alt="" />
            <label>JobNector</label>
          </span>
          <div className="nav-signup-left-content">
            <h1>Create Account</h1>
            <div className="nav-signup-left-content-section">
              <button>
                <Link
                  to="/register/candidate"
                  onClick={() => document.getElementById("navbar-signup-section").style.display = "none"}
                >
                  Create account as Candidate
                </Link>
              </button>
              <br />
              <button>
                <Link
                  to="/register"
                  onClick={() => document.getElementById("navbar-signup-section").style.display = "none"}
                >
                  Create account as Recruiter
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
