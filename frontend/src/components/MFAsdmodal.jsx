import React, { useState } from "react";
import axios from "axios";
import "../components/styles/regframe.css";

const MfaModal = ({ onClose, onVerifySuccess, userId }) => {
  const [mfaToken, setMfaToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verify2FAToken = async () => {
    setIsLoading(true);
    setError("");

    if (!mfaToken) {
      setIsLoading(false);
      setError("Please enter the MFA token.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/verifyMFA",
        { userEnteredToken: mfaToken, userId: userId } // Updated payload to match backend expectations
      );

      if (response.status === 200) {
        onVerifySuccess(response.data); // Pass response data to the handler
      } else {
        setError("Failed to verify MFA token.");
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error verifying token"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mfa-modal">
      <h3>Enter MFA Code</h3>
      <input
        type="text"
        value={mfaToken}
        onChange={(e) => setMfaToken(e.target.value)}
        placeholder="MFA Token"
      />
      <button onClick={verify2FAToken} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </button>
      {error && <p className="error">{error}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MfaModal;
