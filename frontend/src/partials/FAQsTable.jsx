import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function FAQsTable() {
  const [issues, setIssues] = useState([]);
  const [expandedIssueId, setExpandedIssueId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

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

      // Extract unique categories from the data
      const uniqueCategories = [
        ...new Set(response.data.map((issue) => issue.category)),
      ];

      // Set the fetched issues and unique categories to the state
      setIssues(response.data);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching issues:", error.message);
    }
  };

  const fetchDataWithSearch = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(
        "http://localhost:3000/api/knowledgeBase/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { keyword: searchKeyword }, // Send the search keyword
        }
      );

      // Extract unique categories from the data
      const uniqueCategories = [
        ...new Set(response.data.map((issue) => issue.category)),
      ];

      // Set the fetched issues and unique categories to the state
      setIssues(response.data);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching issues:", error.message);
    }
  };

  const toggleIssueContent = (issueId, category) => {
    setExpandedIssueId((prevId) => (prevId === issueId ? null : issueId));
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    fetchDataAll();
  }, [selectedCategory]);

  useEffect(() => {
    fetchDataWithSearch();
  }, [selectedCategory, searchKeyword]);

  const filteredIssues =
    selectedCategory === "all"
      ? issues
      : issues.filter((issue) => issue.category === selectedCategory);

  return (
    <div className="col-span-full xl:col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            FAQs
          </h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={handleSearch}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded p-2"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded p-2"
            >
              <option value="all">Show All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto max-h-[300px]">
          <table className="table-auto w-full dark:text-slate-300">
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">#</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Category</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Keywords</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created At</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Updated At</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Content</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue, index) => (
                  <React.Fragment key={issue._id}>
                    <tr
                      className="cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                      onClick={() =>
                        toggleIssueContent(issue._id, issue.category)
                      }
                    >
                      <td className="p-2">
                        <div className="text-center">{index + 1}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{issue.category}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {issue.keyWords.join(", ")}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {new Date(issue.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {new Date(issue.updatedAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-2 flex items-center justify-center">
                        <div className="text-center">
                          {expandedIssueId === issue._id ? (
                            <FiChevronUp className="text-blue-500" />
                          ) : (
                            <FiChevronDown className="text-blue-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedIssueId === issue._id && (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-2 text-left bg-gray-100 dark:bg-slate-600"
                        >
                          <div>{issue.content}</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-2 text-center">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FAQsTable;
