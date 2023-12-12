import React, { useState, useEffect } from "react";
import axios from "axios";

const TwoFactorAuth = () => {
  const [userEnteredToken, setUserEnteredToken] = useState("");
  const [enabled2FA, setEnabled2FA] = useState(false);
  const [qrCodeURL, setQrCodeURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const check2FAStatus = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/users/check-2fa-status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnabled2FA(response.data.is2FAEnabled);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking 2FA status:", error);
        setIsLoading(false);
      }
    };

    check2FAStatus();
  }, []);

  const enable2FA = async () => {
    setIsLoading(true);
    setFeedbackMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/users/enable2fa",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setQrCodeURL(response.data.qrCodeURL);
        setEnabled2FA(true);
        setFeedbackMessage("2FA is enabled. Scan the QR code with your app.");
      } else {
        setFeedbackMessage("Failed to enable 2FA.");
      }
    } catch (error) {
      setFeedbackMessage(error.response ? error.response.statusText : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testLoginWith2FA = async () => {
    setIsLoading(true);
    setFeedbackMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/users/verify2fa",
        { twoFactorAuthToken: userEnteredToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setFeedbackMessage("Login successful with 2FA!");
      } else {
        setFeedbackMessage("Login failed with 2FA.");
      }
    } catch (error) {
      setFeedbackMessage(error.response ? error.response.statusText : error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-200 rounded-md shadow-md max-w-md">
      <h1 className="text-2xl font-bold mb-4">2FA Test</h1>

      {isLoading && <p>Loading...</p>}

      {!enabled2FA && (
        <>
          <p>Click the button below to enable 2FA:</p>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md" onClick={enable2FA}>
            Enable 2FA
          </button>
        </>
      )}

      {enabled2FA && qrCodeURL && (
        <>
          <p>Scan the QR code with your 2FA app:</p>
          <img src={qrCodeURL} alt="2FA QR Code" />
        </>
      )}

      {enabled2FA && (
        <>
          <p>Enter the 2FA token to test login:</p>
          <input
            type="text"
            value={userEnteredToken}
            onChange={(e) => setUserEnteredToken(e.target.value)}
            className="border border-gray-400 p-2 mt-2 rounded-md"
            placeholder="Enter 2FA Token"
          />
          <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md" onClick={testLoginWith2FA}>
            Test Login with 2FA
          </button>
        </>
      )}

      {feedbackMessage && <p className="mt-4">{feedbackMessage}</p>}
    </div>
  );
};

export default TwoFactorAuth;
