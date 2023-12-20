import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function DashboardCard06() {
  const { users } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "http://localhost:3000/api/users/admin-register",
        {
          name,
          email,
          role,
          password,
          expertise,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User registered successfully:", response.data);

      // Toggle success message
      setShowSuccessMessage(true);
      setShowErrorMessage(false);

      // Reset form fields after successful registration
      setName("");
      setEmail("");
      setRole("");
      setPassword("");
      setExpertise("");
    } catch (error) {
      console.error("Error registering user:", error.message);

      // Toggle error message
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Create users
        </h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </header>
      <div className="p-5">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md dark:bg-slate-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Email
        </label>
        <input
          type="email"
          className="mt-1 p-2 w-full border rounded-md dark:bg-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Role
        </label>
        <select
          className="mt-1 p-2 w-full border rounded-md dark:bg-slate-700"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="agent">Agent</option>
        </select>

        {role === "agent" && (
          <>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Expertise
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md dark:bg-slate-700"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
            />
          </>
        )}

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Password
        </label>
        <input
          type="password"
          className="mt-1 p-2 w-full border rounded-md dark:bg-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
        />
        <small className="text-xs text-gray-500">
          Password should be at least 8 characters long.
        </small>
      </div>

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
    </div>
  );
}

export default DashboardCard06;
