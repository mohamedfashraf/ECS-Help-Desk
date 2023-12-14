import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change the import to useNavigate
import "./styles";
import facebookIcon from "../svgs/facebook.svg";
import googleIcon from "../svgs/google.svg";
import githubIcon from "../svgs/github.svg";

export function SignInFrame() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFactorAuthToken, setTwoFactorAuthToken] = useState("");

  // Use the useNavigate hook instead of useHistory
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Google Authentication Handler
  const handleGoogleAuth = () => {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIs2FAEnabled(response.data.is2FAEnabled); // Assuming the server sends this information

      if (!response.data.is2FAEnabled) {
        setSuccessMsg("Login successful!");
        navigate("/security-settings");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          error.response.data.message || "An error occurred during Login.",
        );
      } else if (error.request) {
        setErrorMsg("No response from the server. Please try again later.");
      } else {
        setErrorMsg("Error: " + error.message);
      }
    }
  };

  return (
    //end of connection
    <div className="frame-style pt-10">
      <div className="p-10">
        <h2 className="form-title animate-fade-down text-left">Login</h2>
        <p className="form-subtitle text-left">Glad you’re back.! </p>

        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email/Phone"
            value={email}
            onChange={handleEmailChange}
            className="input-style"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
              Already Registered?{" "}
              <a href="/Signup" className="text-style underline">
                Login
              </a>
            </p>
            <div className="subText-style text-w flex justify-between">
              <p>Terms & Conditions</p>
              <p>Support</p>
              <p>Customer Care</p>
            </div>
          </div>
          {successMsg && (
            <div className="mt-4 text-green-500">{successMsg}</div>
          )}
          {errorMsg && <div className="mt-4 text-red-500">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignInFrame;
