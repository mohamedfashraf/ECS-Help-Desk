// components/CreateIssue.jsx
import React, { useState } from 'react';

const CreateIssue = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [keyWords, setKeyWords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the issue data
    const issueData = {
      content,
      category,
      keyWords: keyWords.map(kw => kw.trim()) // Trimming each keyword
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/knowledgeBase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers, like authorization tokens
        },
        body: JSON.stringify(issueData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Issue created:', data);

      // Reset the form fields or redirect to another page, as needed
      setContent('');
      setCategory('');
      setKeyWords([]);
      // Optionally, handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error creating issue:', error);
      // Optionally, handle errors (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Content
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          type="text"
          placeholder="Issue content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          type="text"
          placeholder="Issue category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keywords">
          Keywords
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="keywords"
          type="text"
          placeholder="Comma-separated keywords"
          value={keyWords.join(', ')}
          onChange={(e) => setKeyWords(e.target.value.split(','))}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Create Issue
      </button>
    </form>
  );
};

export default CreateIssue;
