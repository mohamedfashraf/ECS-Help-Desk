// components/IssueByCategory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueByCategory = () => {
  const [issuesByCategory, setIssuesByCategory] = useState([]);

  useEffect(() => {
    // Fetch issues by category
  }, []);

  return (
    <div className="p-4">
      {issuesByCategory.map((category) => (
        <div key={category._id} className="mb-4">
          <h3 className="text-lg font-bold mb-2">{category._id}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Content</th>
                </tr>
              </thead>
              <tbody>
                {category.issues.map((issue) => (
                  <tr key={issue._id}>
                    <td className="border px-4 py-2">{issue._id}</td>
                    <td className="border px-4 py-2">{issue.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueByCategory;
