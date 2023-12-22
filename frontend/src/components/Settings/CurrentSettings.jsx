import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal"; // Assuming you have a Modal component

const CurrentSettings = () => {
  const [enableMFA, setEnableMFA] = useState(false);
  const [itemUpdateNotifications, setItemUpdateNotifications] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [userEnteredToken, setUserEnteredToken] = useState("");
  useEffect(() => {
    // Function to check the current 2FA status
    const checkMFAStatus = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          "http://localhost:3000/api/users/check-2fa-status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnableMFA(response.data.is2FAEnabled);
      } catch (error) {
        console.error("Error fetching MFA status:", error);
      }
    };

    checkMFAStatus();
  }, []);
  const handleEnableMFAChange = async () => {
    setIsLoading(true);
    setFeedbackMessage("");
    const newMFAStatus = !enableMFA;

    try {
      const token = localStorage.getItem("Token");
      let response;

      if (newMFAStatus) {
        // Enable MFA
        response = await axios.post(
          "http://localhost:3000/api/users/enable2fa",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Disable MFA
        response = await axios.post(
          "http://localhost:3000/api/users/disable2fa",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.status === 200) {
        setEnableMFA(newMFAStatus);
        setFeedbackMessage(newMFAStatus ? "MFA enabled." : "MFA disabled.");
        setShowModal(newMFAStatus);
        if (newMFAStatus) {
          setQrCodeUrl(response.data.qrCodeURL);
        }
      } else {
        throw new Error("Failed to update MFA setting.");
      }
    } catch (error) {
      setFeedbackMessage(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  const verify2FAToken = async () => {
    setIsLoading(true);
    setFeedbackMessage("");

    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "http://localhost:3000/api/users/verify2fa",
        { twoFactorAuthToken: userEnteredToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setEnableMFA(true); // Enable MFA only after successful token verification
        setShowModal(false); // Close the QR code modal
        setFeedbackMessage("2FA setup successful.");
      } else {
        setFeedbackMessage("Failed to verify 2FA token.");
      }
    } catch (error) {
      setFeedbackMessage(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0">
      <div className="flow-root">
        <h3 className="text-xl font-semibold dark:text-white mb-6">Settings</h3>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400"></p>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Toggle for Enable MFA */}
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Enable MFA
              </div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Enable multi-factor authentication for added security
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enableMFA}
                onChange={handleEnableMFAChange}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </div>

          {/* Toggle for Item Update Notifications */}
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Item update notifications
              </div>
              <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                Send user and product notifications for you
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={itemUpdateNotifications}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </div>

          {/* Additional toggles can be added here following the same pattern */}
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save all
          </button>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Scan QR Code</h3>
          <p>Scan this QR code with your authenticator app to enable MFA.</p>
          <img src={qrCodeUrl} alt="MFA QR Code" />

          <div>
            <input
              type="text"
              value={userEnteredToken}
              onChange={(e) => setUserEnteredToken(e.target.value)}
              placeholder="Enter 2FA Token"
            />
            <button onClick={verify2FAToken}>Verify Token</button>
          </div>

          {feedbackMessage && <p>{feedbackMessage}</p>}
        </Modal>
      )}
    </div>
  );
};

export default CurrentSettings;
