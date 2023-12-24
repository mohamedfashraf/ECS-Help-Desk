import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function SendEmail() {
  const { user } = useContext(AuthContext);
  const [userEmails, setUserEmails] = useState([]);
  const [expandedEmailId, setExpandedEmailId] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState(null);

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          "http://localhost:3000/api/emails/inbox",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserEmails(response.data);
      } catch (error) {
        console.error("Error fetching user emails:", error.response.data);
      }
    };

    fetchUserEmails();
  }, [user]);

  const toggleEmailDetails = (emailId) => {
    setExpandedEmailId(expandedEmailId === emailId ? null : emailId);
  };

  const handleReply = async (toMail) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/emails/reply",
        {
          toMail,
          message: replyMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      // Handle success
      setReplyStatus({ type: "success", message: "Reply successful" });
      setTimeout(() => setReplyStatus(null), 3000);

      // Reset the replyMessage input
      setReplyMessage("");

      // Optionally, you can update the state or perform other actions
      console.log("Reply successful", response.data);
    } catch (error) {
      // Handle error
      setReplyStatus({ type: "error", message: "Error replying to email" });
      setTimeout(() => setReplyStatus(null), 3000);

      console.error("Error replying to email:", error.response.data);
    }
  };

  const renderEmailItem = (email) => (
    <li
      key={email._id}
      className="border-b border-gray-300 dark:border-gray-700 p-4 transition duration-300 ease-in-out transform hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
    >
      <div onClick={() => toggleEmailDetails(email._id)}>
        <div className="mb-2">
          <span className="text-gray-700 dark:text-gray-300">Email:</span>{" "}
          {email.userEmail}
        </div>
        <div className="mb-2">
          <span className="text-gray-700 dark:text-gray-300">Agent:</span>{" "}
          {email.agentName || "N/A"}
        </div>
        <div>
          <span className="text-gray-700 dark:text-gray-300">Agent Email:</span>{" "}
          {email.agentEmail}
        </div>
      </div>
      {expandedEmailId === email._id && (
        <div className="mt-4 pl-4 border-l border-gray-300 dark:border-gray-700">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">
            Messages:
          </h4>
          {email.messages.map((msg, idx) => (
            <div key={idx} className="mt-2">
              <strong className="text-gray-700 dark:text-gray-300">
                {msg.sender}:
              </strong>{" "}
              {msg.message}{" "}
              <em className="text-gray-500 dark:text-gray-400">
                ({new Date(msg.timestamp).toLocaleString()})
              </em>
            </div>
          ))}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded dark:bg-gray-700 text-white"
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleReply(email.userEmail)}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </li>
  );

  return (
    <div className="col-span-full xl:col-span-15 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-300 dark:border-gray-700">
      <header className="px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          Reply on my Emails
        </h2>
      </header>
      <div className="px-6 py-4">
        {replyStatus && (
          <div
            className={`mb-4 ${
              replyStatus.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white py-2 px-4 rounded`}
          >
            {replyStatus.message}
          </div>
        )}
        <ul className="max-h-60 overflow-y-auto">
          {userEmails.map(renderEmailItem)}
        </ul>
      </div>
    </div>
  );
}

export default SendEmail;
