import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function AddFAQsCard() {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDataAll();
  }, []);

  const fetchDataAll = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(
        "http://localhost:3000/api/knowledgeBase/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error.message);
    }
  };

  const handleCreateFAQ = async () => {
    try {
      const token = localStorage.getItem("Token");
      await axios.post(
        "http://localhost:3000/api/knowledgeBase/",
        {
          content,
          category,
          keyWords,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchDataAll();
      resetForm();
      setSuccessMessage("FAQ created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating FAQ:", error.message);
      setErrorMessage("Failed to create FAQ.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleUpdateFAQ = async () => {
    try {
      const token = localStorage.getItem("Token");
      await axios.put(
        `http://localhost:3000/api/knowledgeBase/${selectedIssue._id}`,
        {
          content,
          category,
          keyWords,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchDataAll();
      resetForm();
      setSuccessMessage("FAQ updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating FAQ:", error.message);
      setErrorMessage("Failed to update FAQ.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleSelectIssue = (issue) => {
    if (issue) {
      setSelectedIssue(issue);
      setContent(issue.content);
      setCategory(issue.category);
      setKeyWords(issue.keyWords.join(", "));
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedIssue(null);
    setContent("");
    setCategory("");
    setKeyWords("");
  };

  return (
    <div className="col-span-full xl:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Manage FAQs
        </h2>
      </header>
      <div className="px-5 py-3">
        {successMessage && (
          <div className="text-green-500 mb-2">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              className="w-full p-2 border rounded dark:bg-gray-700 text-white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Category
            </label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Software Issue">Software</option>
              <option value="Network Issue">Network</option>
              <option value="Hardware Issue">Hardware</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Keywords
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-700 text-white"
              value={keyWords}
              onChange={(e) => setKeyWords(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={selectedIssue ? handleUpdateFAQ : handleCreateFAQ}
            >
              {selectedIssue ? "Update FAQ" : "Create FAQ"}
            </button>
          </div>
        </form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Select FAQ to Update
          </label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 text-white"
            onChange={(e) =>
              handleSelectIssue(
                e.target.value ? JSON.parse(e.target.value) : null
              )
            }
            value={selectedIssue ? JSON.stringify(selectedIssue) : ""}
          >
            <option value="" className="text-blue-500">
              Create a New FAQ
            </option>
            {issues.map((issue) => (
              <option key={issue._id} value={JSON.stringify(issue)}>
                {issue.content}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AddFAQsCard;
