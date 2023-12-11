import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

const TwoFactorAuth = () => {
  const [userEnteredToken, setUserEnteredToken] = useState("");
  const [enabled2FA, setEnabled2FA] = useState(false);
  const [secret, setSecret] = useState("");

  const enable2FA = async () => {
    try {
      // Fetch the secret from the server using Axios
      const response = await axios.post(
        "http://localhost:3000/api/users/enable2fa",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        const secretFromServer = response.data.secret;
        setSecret(secretFromServer);
        setEnabled2FA(true);
      } else {
        console.error("Error enabling 2FA:", response.statusText);
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
  };

  const testLoginWith2FA = async () => {
    try {
      // Send the entered 2FA token to the server for verification
      const response = await axios.post(
        "http://localhost:3000/api/users/enable2fa",
        { token: userEnteredToken },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful with 2FA!");
      } else {
        console.error("Login failed with 2FA:", response.statusText);
      }
    } catch (error) {
      console.error("Error testing login with 2FA:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-200 rounded-md shadow-md max-w-md">
      <h1 className="text-2xl font-bold mb-4">2FA Test</h1>

      {!enabled2FA ? (
        <>
          <p>Click the button below to enable 2FA:</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            onClick={enable2FA}
          >
            Enable 2FA
          </button>
        </>
      ) : (
        <>
          <p>Scan the QR code with your 2FA app:</p>
          <QRCode
            value={`otpauth://totp/YourApp:${encodeURIComponent(
              secret
            )}?issuer=YourApp`}
          />

          <p>Enter the 2FA token to test login:</p>
          <input
            type="text"
            value={userEnteredToken}
            onChange={(e) => setUserEnteredToken(e.target.value)}
            className="border border-gray-400 p-2 mt-2 rounded-md"
            placeholder="Enter 2FA Token"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md"
            onClick={testLoginWith2FA}
          >
            Test Login with 2FA
          </button>
        </>
      )}
    </div>
  );
};

export default TwoFactorAuth;
