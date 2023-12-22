import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function SendEmail() {
  const { user } = useContext(AuthContext);
  const [toEmail, setToEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("Token");

      const data = {
        userEmail: user.email,
        messages: [{ message }],
      };

      // If the user is an agent or admin, set the "to" field from the state
      if (user.role.includes("agent") || user.role.includes("admin")) {
        data.userEmail = toEmail;
      }

      await axios.post("http://localhost:3000/api/emails", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set success message
      setSuccessMessage("Email sent successfully");

      // Clear input fields
      setToEmail("");
      setMessage("");

      // Set a timeout to clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error.response.data);
      // Handle error (e.g., show an error message)
      setErrorMessage("Error sending email");
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
        <form>
          {user.role.includes("admin") || user.role.includes("agent") ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                To:
              </label>
              <input
                type="email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
            </div>
          ) : null}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              From:
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
              value={user.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              Message:
            </label>
            <textarea
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSendMessage}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendEmail;
