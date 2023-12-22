import React, { useState } from 'react';
import axios from 'axios';

const MfaModal = ({ onClose, onVerifySuccess }) => {
  const [mfaToken, setMfaToken] = useState('');
  const [error, setError] = useState('');

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "http://localhost:3000/api/users/verify2fa",
        { twoFactorAuthToken: mfaToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        onVerifySuccess(); // Callback function when verification is successful
      } else {
        setError("Failed to verify MFA token.");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Error verifying token");
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
      <button onClick={verifyToken}>Verify</button>
      {error && <p className="error">{error}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MfaModal;
