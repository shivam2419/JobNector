import React, { useState } from "react";
import "../style/LoginSignup.css";
import { Link } from "react-router-dom";
import Loader from "../assets/loader.gif";
function LoginSignup() {
  const url = "https://jobnector.onrender.com/";
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    setLoading(true);
    formData.username = formData.username.trimEnd();
    const username = formData.username.replace(/ /g, "_").toLowerCase();

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
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("resume_url", data.resume_url);
      localStorage.setItem("skills", JSON.stringify(data.skills));

      const userType = await fetchUserType();
      setLoading(false);
      if (userType?.is_candidate) window.location.href = "/candidate";
      if (userType?.is_recruiter) window.location.href = "/recruiter";
    } catch (error) {
      alert("Some error occurred during login");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="login-signup-container">
        {loading && (
          <div className="loader-overlay">
            <center>
              <img
                src={Loader}
                alt=""
                style={{ height: "100px", margin: "2%" }}
              />
            </center>
          </div>
        )}
        <div className="form-box">
          <h2>{isLogin ? "Login" : "Signup"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="signup-option-section">
                <Link to="/register">Signup as recruiter</Link>
                <Link to="/register/candidate">Singup as candidate</Link>
              </div>
            )}
            {isLogin && (
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="eye-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </span>
                </div>

                <button type="submit">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            )}
          </form>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
