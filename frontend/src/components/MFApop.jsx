import React, { useState } from "react";
import "./styles/regframe.css";
const MfaPopUp = ({ onClose, onMfaSubmit }) => {
  const [mfaToken, setMfaToken] = useState("");

  const handleSubmit = () => {
    onMfaSubmit(mfaToken);
    setMfaToken(""); // Clear the token after submission
  };

  return (
    <div className="mfa-modal-backdrop">
      <div className="mfa-modal-content">
        <h3>Enter MFA Code</h3>
        <input
          type="text"
          value={mfaToken}
          onChange={(e) => setMfaToken(e.target.value)}
          placeholder="MFA Token"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MfaPopUp;
