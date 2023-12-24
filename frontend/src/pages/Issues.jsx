import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchIssue from '../components/SearchIssues'; // Import from the current directory

const Issues = () => {
  const [issues, setIssues] = useState([]);

useEffect(() => {
    // Fetch data from the backend using your async function
    const fetchData = async () => {
        try {
            const response = await fetch('/api/getIssues'); // Adjust the endpoint accordingly
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []); // Ensure this effect runs only once on component mount

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        {/* Header Section */}
        <div className="text-center py-8 bg-gray-200 shadow">
          <h1 className="text-4xl font-bold text-gray-800">Issue Management</h1>
          <p className="text-gray-600">Search and manage issues efficiently.</p>
        </div>

        {/* Search Issue Section */}
        <div className="px-4 md:px-10 py-6">
          <div className="bg-white shadow rounded-lg p-6">
            <SearchIssue />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-1 overflow-y-auto p-4">

          {/* Table Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Issue Table</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue._id}>
                    <td>{issue._id}</td>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Content Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Content</h2>
            {/* Additional content goes here */}
            <div>
              {/* Additional content goes here */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Issues;
