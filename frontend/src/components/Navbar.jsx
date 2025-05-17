import React from "react";
import logo from "../assets/JobNector.png";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export const Navbar = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-logo-section">
          <img src={logo} alt="" />
          <h3>
            <Link to="/">JobNector</Link>
          </h3>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="custom-dropdown">
              <div className="label">Jobs </div>
              <ul className="options">
                <li>Jobs in Noida</li>
                <li>Jobs in Delhi</li>
                <li>Jobs in Gurugram</li>
                <li>Jobs in Banglore</li>
              </ul>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-btns">
          <Link
            onClick={() => {
              document.getElementById("navbar-login-section").style.display =
                "flex";
            }}
          >
            Login
          </Link>
          <Link onClick={() => {
              document.getElementById("navbar-signup-section").style.display =
                "flex";
            }}>Register</Link>
        </div>
      </nav>
      <div className="nav-login" id="navbar-login-section">
        <div className="nav-login-left ">
          <b onClick={() => {
              document.getElementById("navbar-login-section").style.display =
                "none";
            }}>X</b>
          <span>
            <img src={logo} alt="" />
            <label>JobNector</label>
          </span>
          <div className="nav-login-left-content">
            <h1>Login to Your Account</h1>
            <p>Login using social networks</p>
            <span>
              <i><FaFacebook /></i>
              <i><FaInstagram/></i>
              <i><FaGithub/></i>
              <i><FcGoogle/></i>
            </span>
            <hr />
            <input type="text" placeholder="Enter username" required/>
            <br /> <br />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
            <br />
            <br />
            <button>
              <Link to="/candidate" onClick={()=>{document.getElementById("navbar-login-section").style.display =
                "none"}}>Sign In</Link>
            </button>
          </div>
        </div>
        <div className="nav-login-right">
          <b
            onClick={() => {
              document.getElementById("navbar-login-section").style.display =
                "none";
            }}
          >
            X
          </b>
          <div className="nav-login-right-content">
            <h1>New Here?</h1>
            <p>Sign up and discover a great amount of new opportunity</p>
            <button>
              <Link onClick={() => {
              document.getElementById("navbar-login-section").style.display =
                "none";
              document.getElementById("navbar-signup-section").style.display =
                "flex";
            }}>Sign up</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="nav-signup" id="navbar-signup-section">
        <div className="nav-signup-right">
          <b
            onClick={() => {
              document.getElementById("navbar-signup-section").style.display =
                "none";
            }}
          >
            X
          </b>
          <div className="nav-signup-right-content">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with you personal info.</p>
            <button>
              <Link onClick={() => {
              document.getElementById("navbar-login-section").style.display =
                "flex";
              document.getElementById("navbar-signup-section").style.display =
                "none";
            }}
            >Sign In</Link>
            </button>
          </div>
        </div>
        <div className="nav-signup-left ">
          <b onClick={() => {
              document.getElementById("navbar-signup-section").style.display =
                "none";
            }}>X</b>
          <span>
            <img src={logo} alt="" />
            <label>JobNector</label>
          </span>
          <div className="nav-signup-left-content">
            <h1>Create Account</h1>
            <p>Signup using social networks</p>
            <span>
              <i><FaFacebook /></i>
              <i><FaInstagram/></i>
              <i><FaGithub/></i>
              <i><FcGoogle/></i>
            </span>
            <hr />
            <input type="text" placeholder="Enter username" required/>
            <br /> <br />
            <input type="email" placeholder="Enter email" required/>
            <br /><br />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
            <br />
            <br />
            <button>
              <Link to="/recruiter" onClick={()=>{document.getElementById("navbar-signup-section").style.display =
                "none"}}>Sign Up</Link>
            </button>
            <br />
              <Link to="/register" style={{color: "#1e88e5", marginTop: "10px"}}>Create account as Recruiter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
