import React, { useState, useContext } from "react";
import axios from "axios";
import Icon from "../../images/icon-01.svg";
import { AuthContext } from "../../context/AuthContext";

function DashboardCard01() {
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const [ticketData, setTicketData] = useState({
    description: "",
    category: "Software",
    subCategory: "",
    priority: "Low",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createTicket = async () => {
    try {
      const token = localStorage.getItem("Token");

      const response = await axios.post(
        "http://localhost:3000/api/tickets/",
        {
          ...ticketData,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);

      // Show confirmation pop-up
      setShowConfirmation(true);

      // Hide confirmation pop-up after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="relative flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      {/* Confirmation pop-up */}
      {showConfirmation && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded">
          Ticket created successfully!
        </div>
      )}

      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Create Ticket" />
          {/* Button to create ticket */}
          <button
            onClick={createTicket}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Create Ticket
          </button>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Apply for a new ticket
        </h2>
        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={ticketData.category}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:bg-slate-900 dark:text-white"
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subcategory
          </label>
          <input
            type="text"
            name="subCategory"
            value={ticketData.subCategory}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            name="priority"
            value={ticketData.priority}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:bg-slate-900 dark:text-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
