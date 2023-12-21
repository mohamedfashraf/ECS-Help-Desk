import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function DashboardCard11() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem("Token");

      const response = await axios.post(
        "http://localhost:3000/api/emails",
        {
          userEmail: user.email,
          messages: [{ message }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Email sent successfully:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error sending email:", error.response.data);
      // Handle error (e.g., show an error message)
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
        <textarea
          className="w-full h-40 border p-2"
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
