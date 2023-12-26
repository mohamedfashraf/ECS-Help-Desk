import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const ViewAutomatedWorkflows = () => {
  const [issueTypes, setIssueTypes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedIssueType, setSelectedIssueType] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [allWorkflows, setAllWorkflows] = useState([]);
  const [feedbackProvided, setFeedbackProvided] = useState(''); // Ensure feedbackProvided is declared here
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userRole = user.role;


  useEffect(() => {
    const fetchIssueTypes = async () => {
      try {
        const token = localStorage.getItem('Token');
        const issueTypesResponse = await axios.get('http://localhost:3000/api/automatedWorkflows/issuetype', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssueTypes(issueTypesResponse.data);
      } catch (error) {
        console.error('Error fetching issue types:', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const token = localStorage.getItem('Token');
        const subcategoriesResponse = await axios.get('http://localhost:3000/api/automatedWorkflows/subcategory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubcategories(subcategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };



    fetchIssueTypes();
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (selectedIssueType && selectedSubcategory) {
        const fetchAllWorkflows = async () => {
            try {
              const token = localStorage.getItem('Token');
              const issueType = selectedIssueType; // Replace with your actual value
              const subCategory = selectedSubcategory; // Replace with your actual value
          const workflowsResponse = await axios.get(`http://localhost:3000/api/automatedWorkflows/specific?issueType=${issueType}&subCategory=${subCategory}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setAllWorkflows(workflowsResponse.data);
            } catch (error) {
              console.error('Error fetching workflows:', error);
            }
          };
      
      

          fetchAllWorkflows();
    }
  }, [selectedIssueType, selectedSubcategory]);

  const handleIssueTypeChange = (event) => {
    setSelectedIssueType(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleFeedbackYes = () => {
    setFeedbackProvided('yes');
  };

  const handleFeedbackNo = () => {
    setFeedbackProvided('no');
  };
  const handleCreateTicket = () => {
    // Redirect to "/tickets" for negative feedback
    navigate('/');
  };

  

  return (
<div>
    <div style={{ marginBottom: '10vh' }}>
      <label htmlFor="issueType">Select Issue Type: </label>
      <select id="issueType" value={selectedIssueType} onChange={handleIssueTypeChange} style={{ backgroundColor: '#000000' }}>
        <option value="">Select...</option>
        {issueTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>

    <div style={{ marginBottom: '10vh' }}>
      <label htmlFor="subCategory">Select Subcategory: </label>
      <select id="subCategory" value={selectedSubcategory} onChange={handleSubcategoryChange} style={{ backgroundColor: 'Black' }}>
        <option value="">Select...</option>
        {subcategories.map((subcat, index) => (
          <option key={index} value={subcat}>{subcat}</option>
        ))}
      </select>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10vh' }}>
        <h3>Workflows:</h3>
        <textarea
          style={{
            marginLeft: '5px',
            width: '30vw', // Adjust the width as needed
            height: '20vh', // Allow the height to adjust automatically
            padding: '10px', // Adjust the padding as needed
            backgroundColor: 'Black', // Replace '#yourColorCode' with your desired color
            border: '1px solid', // Add border as needed
            overflowY: 'hidden', // Hide the vertical scrollbar
          }}
          
          value={allWorkflows.map((workflow) => workflow.workflow).join('\n')}
          readOnly
        />
      </div>

      {selectedIssueType && selectedSubcategory && userRole.includes('user') && (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10vh' }}>
    {feedbackProvided  ? (
      <>
        {feedbackProvided === 'yes' ? (
          <p>We are pleased to help you!</p>
        ) : (
          <>
            <p>Try creating a ticket</p>
            <button onClick={handleCreateTicket} style={{ marginLeft: '3vh', padding: '1vh', paddingLeft:'3vh', paddingRight:'3vh', backgroundColor: 'Black' }}>
              Create a Ticket
            </button>
          </>
        )}
      </>
    ) : ( 
      <>
        <p>Was this helpful?</p>
        <button onClick={handleFeedbackYes} style={{ marginLeft: '3vh', padding: '1vh', paddingLeft:'3vh', paddingRight:'3vh', backgroundColor: 'Black' }}>
          Yes
        </button>
        <button onClick={handleFeedbackNo} style={{ marginLeft: '3vh', padding: '1vh', paddingLeft:'3vh', paddingRight:'3vh', backgroundColor: 'Black' }}>
          No
        </button>
      </>
    )}
  </div>

      )}
</div>
  );
};

export default ViewAutomatedWorkflows;
