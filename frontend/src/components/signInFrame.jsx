import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change the import to useNavigate
import "../components/styles/regframe.css";

import facebookIcon from "../svgs/facebook.svg";
import googleIcon from "../svgs/google.svg";
import githubIcon from "../svgs/github.svg";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export function SignInFrame() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFactorAuthToken, setTwoFactorAuthToken] = useState("");

  // Use the useNavigate hook instead of useHistory

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Google Authentication Handler
  const handleGoogleAuth = () => {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  };
  const handleSignUpRedirect = () => {
    useNavigate("/SignUp"); // Update with your actual signup path
  };

  const { loginUser, loginInfo, updateLoginInfo, loginError, loginLoading } =
    useContext(AuthContext);

  const handleInputChange = (e) => {
    updateLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();

    const response = await loginUser();

    if (response && response.user) {
      // Navigate to the dashboard on successful login
      useNavigate("/pages/Dashboard"); // Replace with your dashboard path
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
            value={email}
            onChange={handleInputChange}
            className="input-style"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
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
