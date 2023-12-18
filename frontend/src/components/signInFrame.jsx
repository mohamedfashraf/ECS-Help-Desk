import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/styles/regframe.css";

import facebookIcon from "../svgs/facebook.svg";
import googleIcon from "../svgs/google.svg";
import githubIcon from "../svgs/github.svg";
import { AuthContext } from "../context/AuthContext";

export function SignInFrame() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFactorAuthToken, setTwoFactorAuthToken] = useState("");


  const navigate = useNavigate(); // Initialize useNavigate

  const { loginUser, loginInfo, updateLoginInfo, loginError, loginLoading } =
    useContext(AuthContext);


  // Google Authentication Handler
  const handleGoogleAuth = () => {
    // Assuming you have a backend route handling Google Auth
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleSignUpRedirect = () => {
    navigate("/register"); // Navigate to signup page
  };

  const handleInputChange = (e) => {
    updateLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser();

    if (response && response.user) {
      navigate("/"); // Navigate to dashboard on successful login
    }
  };

  return (
    //end of connection
    <div className="frame-style pt-10">
      <div className="p-10">
        <h2 className="form-title text-left animate-fade-down">Login</h2>
        <p className="form-subtitle text-left">Glad you’re back.! </p>

        <form className="input-form" onSubmit={loginUser}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleInputChange}
            className="input-style"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleInputChange}
            className="input-style"
          />

          <button
            type="submit"
            className="gradient-button2 hover:bg-customblack"
          >
            Login
          </button>

          <div className="divider">
            <div className="line"></div>
            <span className="or-text">Or</span>
            <div className="line"></div>
          </div>

          <div className="social-icons">
            <img
              src={googleIcon}
              alt="Google"
              onClick={handleGoogleAuth}
              style={{ cursor: "pointer" }}
            />
            <img src={githubIcon} alt="GitHub" />
            <img src={facebookIcon} alt="Facebook" />
          </div>

          <div className="additional-text mt-4">
            <p className="text-style">
              <span
                className="text-style underline cursor-pointer"
                onClick={handleSignUpRedirect}
              >
                Sign up
              </span>
            </p>
            <div className="flex justify-between subText-style text-w">
              <p>Terms & Conditions</p>
              <p>Support</p>
              <p>Customer Care</p>
            </div>
          </div>
          {successMsg && (
            <div className="text-green-500 mt-4">{successMsg}</div>
          )}
          {errorMsg && <div className="text-red-500 mt-4">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignInFrame;
