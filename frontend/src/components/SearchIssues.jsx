import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchIssue = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortCategory, setSortCategory] = useState('all');

  useEffect(() => {
    if (keyword.length > 2) {
      fetchIssues();
    } else {
      setSearchResults([]);
    }
  }, [keyword, sortCategory]);

  const fetchIssues = async () => {
    try {
      const token =localStorage.getItem("Token")

      const response = await axios.get("http://localhost:3000/api/knowledgeBase",{headers:
    {
      Authorization: `Bearer $(token)`
    }});
      const filteredResults = response.data.filter(issue => 
        sortCategory === 'all' || issue.category === sortCategory
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  return (
    <div className="relative w-full text-black">
      <input
        className="w-full py-2 pl-4 pr-20 border rounded shadow focus:outline-none"
        type="text"
        placeholder="Search issues..."
        value={keyword}
        onChange={handleKeywordChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <select
          className="bg-transparent h-full px-2 border-none text-black focus:ring-transparent focus:border-transparent"
          onChange={handleCategoryChange}
          value={sortCategory}
        >
          <option value="all">All</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="network">Network</option>
        </select>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute w-full mt-12 z-10 border border-t-0 rounded shadow bg-white">
          {searchResults.map(issue => (
            <div key={issue._id} className="p-2 border-t">
              {/* Display issue details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchIssue;
