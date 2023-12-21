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
    <div className="relative flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:border-gray-700 sm:p-6 dark:bg-gray-800 shadow-lg rounded-lg border border-slate-200">
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
        <h3 className="mb-4 text-xl font-semibold dark:text-white">
          Apply for a new ticket
        </h3>
        {/* Input fields */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={ticketData.description}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select
            name="category"
            value={ticketData.category}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Subcategory
          </label>
          <input
            type="text"
            name="subCategory"
            value={ticketData.subCategory}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Priority
          </label>
          <select
            name="priority"
            value={ticketData.priority}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
