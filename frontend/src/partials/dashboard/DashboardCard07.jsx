import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function DashboardCard07() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsers = users.filter((u) => u._id !== userId);
      setUsers(updatedUsers);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setShowErrorMessage(true);
    }
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveEdit = async (userId) => {
    try {
      const token = localStorage.getItem("Token");
      const updatedData = editedFields[userId];

      // Update the local users state
      const updatedUsers = users.map((user) =>
        user._id === userId
          ? { ...user, ...updatedData } // Merge the existing user data with updated fields
          : user
      );
      setUsers(updatedUsers);

      // Clear the editing state
      setEditingUserId(null);
      setEditedFields((prev) => ({ ...prev, [userId]: {} }));

      // Send the updated data to the server
      await axios.put(
        `http://localhost:3000/api/users/update/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setShowErrorMessage(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedFields((prev) => ({ ...prev, [editingUserId]: {} }));
  };

  const handleEditChange = (userId, field, value) => {
    // Handle change in input fields during editing
    // Update the edited fields state
    setEditedFields((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
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
          All Users
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
        <div className="overflow-x-auto max-h-[300px]">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">#</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Role</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="p-2">
                    <div className="text-center">{index + 1}</div>
                  </td>
                  <td className="p-2">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        defaultValue={editedFields[user._id]?.name || user.name}
                        onInput={(e) =>
                          handleEditChange(user._id, "name", e.target.value)
                        }
                        className="mt-1 p-1 w-24 sm:w-32 border rounded-md dark:bg-slate-700 text-white"
                      />
                    ) : (
                      <div className="text-left">{user.name}</div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        defaultValue={editedFields[user._id]?.role || user.role}
                        onInput={(e) =>
                          handleEditChange(user._id, "role", e.target.value)
                        }
                        className="mt-1 p-1 w-12 sm:w-16 border rounded-md dark:bg-slate-700 text-white"
                      />
                    ) : (
                      <div className="text-center">{user.role}</div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingUserId === user._id ? (
                      <input
                        type="email"
                        defaultValue={
                          editedFields[user._id]?.email || user.email
                        }
                        onInput={(e) =>
                          handleEditChange(user._id, "email", e.target.value)
                        }
                        className="mt-1 p-1 w-32 sm:w-48 border rounded-md dark:bg-slate-700 text-white"
                      />
                    ) : (
                      <div className="text-center">{user.email}</div>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="text-center space-x-2">
                      {editingUserId === user._id ? (
                        <>
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleSaveEdit(user._id)}
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
                          onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteUser(user._id)}
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

export default DashboardCard07;
