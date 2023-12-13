import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as needed
import "./styles/regframe.css";
import facebookIcon from "../svgs/facebook.svg";
import googleIcon from "../svgs/google.svg";
import githubIcon from "../svgs/github.svg";

export function SignInFrame() {
  const {
    loginUser,
    loginInfo,
    updateLoginInfo,
    loginError,
    loginLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    window.open(`http://localhost:3000/auth/google/`, "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(); // This method will now handle the login process
  };

  return (
    <div className="frame-style pt-10">
      <div className="p-10">
        <h2 className="form-title text-left animate-fade-down">Login</h2>
        <p className="form-subtitle text-left">Glad you’re back.! </p>

        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email/Phone"
            value={loginInfo.email}
            onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
            className="input-style"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
            className="input-style"
          />

          <button
            type="submit"
            className="gradient-button2 hover:bg-customblack"
            disabled={loginLoading}
          >
            Login
          </button>


          <div className="divider">
            <div className="line"></div>
            <span className="or-text">Or</span>
            <div className="line"></div>
          </div>

          <div className="social-icons">
          <img src={googleIcon} alt="Google" onClick={handleGoogleAuth} style={{ cursor: 'pointer' }} />
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
