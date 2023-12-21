import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

function DashboardCard10() {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reportType, setReportType] = useState(""); // State to store the report type
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // New state for the message

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("Token");

        const response = await axios.get("http://localhost:3000/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Tickets response:", response.data);

        // Exclude __v and number attributes
        const filteredTickets = response.data.map(({ __v, ...ticket }) => {
          const filteredAttributes = Object.entries(ticket).filter(
            ([_, value]) => typeof value !== "number"
          );
          return Object.fromEntries(filteredAttributes);
        });

        setTickets(filteredTickets);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchTickets();
  }, []);

  const generateReport = async () => {
    try {
      const token = localStorage.getItem("Token");

      // Ensure that selectedTicket and its subCategory exist
      if (!selectedTicket || !selectedTicket.subCategory) {
        console.error("Selected ticket or subCategory is undefined");
        setMessage("No ticket or subCategory selected."); // Set failure message
        return; // Exit the function if no ticket or subCategory
      }

      console.log("Subcategory:", selectedTicket.subCategory);

      const response = await axios.post(
        "http://localhost:3000/api/reports",
        {
          type: reportType,
          generatedBy: user._id,
          keyWords: [selectedTicket.subCategory], // Ensure this is an array
          ticketId: selectedTicket._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Report generated:", response.data);
      setMessage("Report successfully generated!"); // Set success message

      // Additional logic if needed after report generation
    } catch (error) {
      console.error("Error generating report:", error);
      setMessage("Failed to generate report."); // Set failure message
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Generate Reports
        </h2>
      </header>

      <div className="p-3">
        {/* Dropdown */}
        <div className="mb-3">
          <label
            htmlFor="ticketDropdown"
            className="text-slate-800 dark:text-slate-100 font-semibold"
          ></label>
          <select
            id="ticketDropdown"
            className="ml-2 p-2 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 rounded-md"
            onChange={(e) =>
              setSelectedTicket(
                tickets.find((ticket) => ticket._id === e.target.value)
              )
            }
          >
            <option value="" disabled>
              Select a ticket
            </option>
            {tickets.map((ticket) => (
              <option key={ticket._id} value={ticket._id}>
                {ticket.description}
              </option>
            ))}
          </select>
        </div>

        {/* Report Type Input */}
        <div className="mb-3 flex items-center">
          <label
            htmlFor="reportType"
            className="text-slate-800 dark:text-slate-100 font-semibold mr-2"
          >
            Type:
          </label>
          <input
            type="text"
            id="reportType"
            className="p-2 border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 rounded-md"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          />
        </div>

        {/* Button to Generate Report */}
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={generateReport}
        >
          Generate Report
        </button>

        {/* Message Display */}
        {message && (
          <div className="mt-3 text-center">
            <span
              className={
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {message}
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Number</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Attribute</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Value</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {selectedTicket &&
                Object.entries(selectedTicket).map(([field, value], index) => (
                  <tr key={field}>
                    <td className="p-2 whitespace-nowrap">{index + 1}</td>
                    <td className="p-2 whitespace-nowrap font-semibold">
                      {field}
                    </td>
                    <td className="p-2 whitespace-nowrap">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
