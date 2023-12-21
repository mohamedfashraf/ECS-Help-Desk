import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function SendEmail() {
  // Component names should start with a capital letter
  const { user } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState(""); // Add state for successMessage
  const [message, setMessage] = useState(""); // Add state for message

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("Token");

      await axios.post(
        "http://localhost:3000/api/emails",
        {
          // Your post data here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Email sent successfully");

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
          Reply on my Emails
        </h2>
      </header>

      <div className="p-5">
        {successMessage && (
          <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
            {successMessage}
          </div>
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

export default SendEmail; // Make sure the component name starts with a capital letter
