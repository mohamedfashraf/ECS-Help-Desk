import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Icon from "../../images/icon-03.svg";
import { AuthContext } from "../../context/AuthContext";
import { FiCheckCircle, FiAlertCircle, FiClock } from "react-icons/fi";

function DashboardCard03() {
  // Context
  const { user } = useContext(AuthContext);
  const userId = user._id;
  console.log("Ticket userId", userId);

  // State
  const [userTickets, setUserTickets] = useState([]);

  // Fetch user tickets on component mount or when userId changes
  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tickets/users/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        // Sort tickets by creation date in descending order
        const sortedTickets = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setUserTickets(sortedTickets);
      } catch (error) {
        console.error("Error fetching user tickets:", error);
      }
    };

    fetchUserTickets();
  }, [userId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <FiAlertCircle className="text-yellow-500" />;
      case "Pending":
        return <FiClock className="text-blue-500" />;
      case "Closed":
        return <FiCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:border-gray-700 sm:p-6 dark:bg-gray-800 shadow-lg rounded-lg border border-slate-200">
      <div className="px-5 pt-5">
        {/* Header */}
        <header className="flex justify-between items-start mb-2">
          <img src={Icon} width="32" height="32" alt="Icon 03" />
        </header>

        {/* Title */}
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Ticket Status
        </h3>

        {/* Ticket List */}
        <div
          className={`${
            userTickets.length > 3 ? "max-h-60 overflow-y-auto" : ""
          }`}
        >
          {userTickets.length > 0 ? (
            userTickets.map((ticket, index) => (
              <div
                key={ticket._id}
                className={`mb-4 p-4 rounded ${
                  index !== userTickets.length - 1
                    ? "border-b border-gray-300 dark:border-gray-700"
                    : ""
                }`}
              >
                {/* Ticket Status */}
                <div className="flex items-center mb-2">
                  <span className="mr-2">{getStatusIcon(ticket.status)}</span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {ticket.status}
                  </p>
                </div>

                {/* Resolution Details (if available) */}
                {ticket.resolutionDetails && (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Resolution Details:
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {ticket.resolutionDetails}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            // No Tickets Message
            <p className="text-gray-600 dark:text-gray-400">
              No tickets found for the user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
