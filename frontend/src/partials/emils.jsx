import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function DashboardCard11() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [userEmail, setUserEmail] = useState(user.email);
  const [showUserEmailInput, setShowUserEmailInput] = useState(
    user.role.includes("agent") ||
      user.role.includes("admin") ||
      user.role.includes("user")
  );
  const [showRecipientEmailInput, setShowRecipientEmailInput] = useState(
    user.role.includes("agent") || user.role.includes("admin")
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("Token");

      const data = {
        userEmail: showUserEmailInput ? userEmail : "",
        recipientEmail: showRecipientEmailInput ? recipientEmail : "",
        messages: [{ message }],
      };

      await axios.post("http://localhost:3000/api/emails", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set success message
      setSuccessMessage("Email sent successfully");

      // Reset input values
      setUserEmail(user.email);
      setMessage("");
      setRecipientEmail("");

      // Set a timeout to clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error.response.data);
      // Handle error (e.g., show an error message)
      console.error("Error sending email");
    }
  };

  return (
    <div className="col-span-full xl:col-span-15 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          New Email
        </h2>
      </header>

      <div className="p-5">
        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
            {successMessage}
          </div>
        )}

        {showUserEmailInput && (
          <input
            type="text"
            className="w-full border p-2 mb-3 bg-gray-800 text-white"
            placeholder="User Email"
            value={userEmail}
            readOnly
            onChange={(e) => setUserEmail(e.target.value)}
          />
        )}

        {showRecipientEmailInput && (
          <input
            type="text"
            className="w-full border p-2 mb-3 bg-gray-800 text-white"
            placeholder="Recipient Email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        )}

        <textarea
          className="w-full h-40 border p-2 bg-gray-800 text-white"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSendMessage}
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default DashboardCard11;
