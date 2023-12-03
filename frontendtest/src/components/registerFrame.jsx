import React from "react";
import "./styles/regframe.css"; // Ensure the correct path is used
import facebookIcon from "../svgs/facebook.svg"; // Update with actual path
import googleIcon from "../svgs/google.svg"; // Update with actual path
import githubIcon from "../svgs/github.svg"; // Update with actual path

export function FrameWithBorder() {
  return (
    <div className="frame-style pt-10 ">
      <div className="p-10 ">
        <h2 className="form-title text-left">Signup</h2>
        <p className="form-subtitle text-left ">
          Just some details to get you in!
        </p>

        <form className="input-form ">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />

          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email/ Phone"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />

          <input
            type="ConfrimPassword"
            id="ConfrimPassword"
            name="ConfrimPassword"
            placeholder="Confrim Password"
          />

          <button type="submit" className="gradient-button">
            Signup
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
          <p className="text-style">Already Registered? <a href="/login" className="text-style underline">Login</a></p>
          <div className="flex justify-between subText-style text-w">
            <p>Terms & Conditions</p>
            <p>Support</p>
            <p>Customer Care</p>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default FrameWithBorder;
