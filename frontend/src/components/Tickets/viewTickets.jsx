import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function viewTickets() {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("Token");
        let apiUrl;

        // Check if the user's roles array includes "agent"
        if (user && user.role && user.role.includes("agent")) {
            apiUrl = "http://localhost:3000/api/tickets/agents/";
        } else {
            apiUrl = "http://localhost:3000/api/tickets/users/";
        }
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the headers
          },
        });

        const responseData = response.data;
        setTickets(responseData);

        // Log the value of tickets for debugging
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [user, tickets]);

  const deleteTicket = async (ticketId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTickets = tickets.filter((t) => t._id !== ticketId);
      setTickets(updatedTickets);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setShowErrorMessage(true);
    }
  };

  const handleEdit = (ticketId) => {
    setEditingTicketId(ticketId);
  };

  const handleSaveEdit = async (ticketId) => {
    try {
      const token = localStorage.getItem("Token");
      const updatedData = editedFields[ticketId];

      // Update the local tickets state
      const updatedTickets = tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, ...updatedData } // Merge the existing ticket data with updated fields
          : ticket
      );
      setTickets(updatedTickets);

      // Clear the editing state
      setEditingTicketId(null);
      setEditedFields((prev) => ({ ...prev, [ticketId]: {} }));

      // Send the updated data to the server
      await axios.put(
        `http://localhost:3000/api/tickets/${ticketId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating ticket:", error);
      setShowErrorMessage(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingTicketId(null);
    setEditedFields((prev) => ({ ...prev, [editingTicketId]: {} }));
  };

  const handleEditChange = (ticketId, field, value) => {
    // Handle change in input fields during editing
    // Update the edited fields state
    setEditedFields((prev) => ({
      ...prev,
      [ticketId]: { ...prev[ticketId], [field]: value },
    }));
  };

  // Reset success and error messages after a short delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessMessage(false);
      setShowErrorMessage(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showSuccessMessage, showErrorMessage]);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Tickets
        </h2>
      </header>
      <div className="p-3">
        {showSuccessMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded">
            Operation successful!
          </div>
        )}
        {showErrorMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded">
            Operation failed!
          </div>
        )}
        <div className="overflow-x-auto max-h-[400px]">
          <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
        <tr>
            <th scope="col" className="px-4 py-3">#</th>
            <th scope="col" className="px-4 py-3">Description</th>
            <th scope="col" className="px-4 py-3">Category</th>
            <th scope="col" className="px-4 py-3">Subcategory</th>
            <th scope="col" className="px-4 py-3">Priority</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Resolution Details</th>
            <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
            </th>
        </tr>
        </thead>


          {/* ... */}
<tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
  {tickets.map((ticket, index) => (
    <tr key={ticket._id}>
      <td className="p-2">
        <div className="text-center">{index + 1}</div>
      </td>
      <td className="p-2">
        {editingTicketId === ticket._id ? (
         <input
         type="text"
         defaultValue={editedFields[ticket._id]?.description || ticket.description}
         onInput={(e) =>
           handleEditChange(ticket._id, "description", e.target.value)
         }
         className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
       />
        ) : (
          <div className="text-center">{ticket.description}</div>
        )}
      </td>
      <td className="p-2">
        {editingTicketId === ticket._id ? (
          <input
            type="text"
            defaultValue={editedFields[ticket._id]?.category || ticket.category}
            onInput={(e) =>
              handleEditChange(ticket._id, "category", e.target.value)
            }
            className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
          />
        ) : (
          <div className="text-center">{ticket.category}</div>
        )}
      </td>
      <td className="p-2">
        {editingTicketId === ticket._id ? (
          <input
            type="text"
            defaultValue={editedFields[ticket._id]?.subCategory || ticket.subCategory}
            onInput={(e) =>
                handleEditChange(ticket._id, "subCategory", e.target.value)
            }
            className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
            />
        ) : (
          <div className="text-center">{ticket.subCategory}</div>
        )}
      </td>
      <td className="p-2">
        {editingTicketId === ticket._id ? (
          <input
            type="text"
            defaultValue={editedFields[ticket._id]?.priority || ticket.priority}
            onInput={(e) =>
              handleEditChange(ticket._id, "priority", e.target.value)
            }
            className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
            />
        ) : (
          <div className="text-center">{ticket.priority}</div>
        )}
      </td>
      <td className="p-2">
  {editingTicketId === ticket._id ? (
    <>
      {user.role.includes("agent") ? (
        <input
          type="text"
          defaultValue={editedFields[ticket._id]?.status || ticket.status}
          onInput={(e) =>
            handleEditChange(ticket._id, "status", e.target.value)
          }
          className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
        />
      ) : (
        <div className="text-center">{ticket.status}</div>
      )}
    </>
  ) : (
    <div className="text-center">{ticket.status}</div>
  )}
</td>

<td className="p-2">
  {editingTicketId === ticket._id ? (
    <>
      {user.role.includes("agent") ? (
        <input
          type="text"
          defaultValue={
            editedFields[ticket._id]?.resolutionDetails || ticket.resolutionDetails
          }
          onInput={(e) =>
            handleEditChange(ticket._id, "resolutionDetails", e.target.value)
          }
          className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
        />
      ) : (
        <div className="text-center">{ticket.resolutionDetails}</div>
      )}
    </>
  ) : (
    <div className="text-center">{ticket.resolutionDetails}</div>
  )}
</td>
      <td className="p-2">
        <div className="text-center space-x-2">
          {editingTicketId === ticket._id ? (
            <>
              <button
                className="text-green-500 hover:underline"
                onClick={() => handleSaveEdit(ticket._id)}
              >
                Save
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleEdit(ticket._id)}
            >
              Edit
            </button>
          )}
          <button
            className="text-red-500 hover:underline"
            onClick={() => deleteTicket(ticket._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default viewTickets;
