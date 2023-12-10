import React, { useState } from "react";
import axios from "axios";
import "./styles/regframe.css"; // Ensure the correct path is used
import facebookIcon from "../svgs/facebook.svg"; // Update with actual path
import googleIcon from "../svgs/google.svg"; // Update with actual path
import githubIcon from "../svgs/github.svg"; // Update with actual path

export function SignInFrame() {
  //connectopn for front and back(make it after frontend)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });
      setSuccessMsg("Login successful! Please login.");
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          error.response.data.message || "An error occurred during Login."
        );
      } else if (error.request) {
        setErrorMsg("No response from the server. Please try again later.");
      } else {
        setErrorMsg("Error: " + error.message);
      }
    }
  };

  //end of connection
  return (
    <div className="frame-style pt-10">
      <div className="p-10">
        <h2 className="form-title text-left animate-fade-down">Signup</h2>
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
            <img src={googleIcon} alt="Google" />
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
