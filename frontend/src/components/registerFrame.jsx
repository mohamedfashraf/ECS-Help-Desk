import "./styles/regframe.css";
import facebookIcon from '../svgs/facebook.svg'; // Update with actual path
import googleIcon from '../svgs/google.svg'; // Update with actual path
import githubIcon from '../svgs/github.svg'; // Update with actual path

export function FrameWithBorder() {
  return (
    <div className="frame-style">
      <div className="p-16 mt-[5%] text-white">
        <h2 className="form-title">Signup</h2>
        <p className="form-subtitle">Just some details to get you in!</p>
        <form className="input-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />

          <button type="submit" className="gradient-button">Signup</button>
          
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
        </form>
      </div>
    </div>
  );
}

export default FrameWithBorder;
