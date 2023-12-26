import React, { useState, useEffect, useContext } from "react";
import Icon from "../../images/icon-02.svg";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function DashboardCard02() {
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newInfo, setNewInfo] = useState({
    description: "",
    category: "Software",
    subCategory: "",
    priority: "Low",
    // Removed resolutionDetails
  });

  // State for success or failure messages
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Helper function to fetch user tickets
  const fetchUserTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tickets/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      setUserTickets(response.data);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    }
  };

  // Fetch user tickets when the component mounts
  useEffect(() => {
    fetchUserTickets();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Helper function to show confirmation message
  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message);

    // Hide confirmation message after 3 seconds
    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    // Reset newInfo when a ticket is selected
    setNewInfo({
      description: "",
      category: "",
      subCategory: "",
      priority: "",
      // Removed resolutionDetails
    });
  };

  const handleUpdate = async () => {
    try {
      // Check if the selected ticket status is "Pending"
      if (selectedTicket.status === "Pending") {
        // Check if newInfo has non-empty values for category and priority
        if (newInfo.category.trim() !== "" && newInfo.priority.trim() !== "") {
          // Make the update request with the selected ticket and new information
          const response = await axios.put(
            `http://localhost:3000/api/tickets/${selectedTicket._id}`,
            newInfo,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );

          console.log("Ticket updated successfully:", response.data);

          // Set success message
          showConfirmationMessage("Ticket updated successfully!");

          // Refetch user tickets to update the list
          fetchUserTickets();
        } else {
          // Set error message
          showConfirmationMessage("Category and priority are required fields.");
        }
      } else {
        // Set error message
        showConfirmationMessage(
          "Cannot update ticket. Status is not 'Pending'."
        );
      }
    } catch (error) {
      console.error("Error updating ticket:", error.response.data);

      // Set error message
      showConfirmationMessage("Failed to update ticket. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:border-gray-700 sm:p-6 dark:bg-gray-800 shadow-lg rounded-lg border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 02" />
          {/* Menu button */}
          <button
            type="button"
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Update Ticket
          </button>
        </header>
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Update ticket
        </h3>
        {/* Display user tickets in a dropdown */}
        <select
          className="mt-11 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          onChange={(e) => handleTicketSelect(JSON.parse(e.target.value))}
        >
          <option value="" disabled selected>
            Select a ticket to update
          </option>
          {userTickets.map((ticket) => (
            <option key={ticket._id} value={JSON.stringify(ticket)}>
              {ticket.description}
            </option>
          ))}
        </select>

        {/* Display form for updating ticket */}
        {selectedTicket && (
          <div className="mt-4">
            <form>
              {/* Add input fields for new information */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Description
                </label>
                <input
                  type="text"
                  value={newInfo.description}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, description: e.target.value })
                  }
                  className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              {/* Add dropdowns for category and priority */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Category
                </label>
                <select
                  value={newInfo.category}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, category: e.target.value })
                  }
                  className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Network">Network</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Subcategory
                </label>
                <input
                  type="text"
                  value={newInfo.subCategory}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, subCategory: e.target.value })
                  }
                  className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  New Priority
                </label>
                <select
                  value={newInfo.priority}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, priority: e.target.value })
                  }
                  className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              {/* Button to update ticket */}
            </form>
          </div>
        )}

        {/* Display success or failure message */}
        {confirmationMessage && (
          <div
            className={`mt-4 text-sm ${
              confirmationMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard02;
