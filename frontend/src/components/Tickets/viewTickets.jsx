import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';


const viewTickets = () => {
  // Access the user context
  const { user } = useContext(AuthContext);

  // Log the value of user for debugging
  console.log('User:', user);

  const [tickets, setTickets] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    description: '',
    category: '',
    subcategory: '',
    priority: '',
    resolutionDetails: '',
});


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the headers
          },
        });

        const responseData = response.data;
        setTickets(responseData);

        // Log the value of tickets for debugging
        console.log('Tickets:', tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [user, tickets]);

  const handleDelete = async (ticketId) => {
    try {
      const token = localStorage.getItem('Token');
      await axios.delete(`http://localhost:3000/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket._id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleCreateTicket = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(
        'http://localhost:3000/api/tickets',
        newTicketData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdTicket = response.data.ticket;
      setTickets((prevTickets) => [...prevTickets, createdTicket]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicketData((prevData) => ({ ...prevData, [name]: value }));
  };

      
  
return (
    <>
    
   {/* <!-- Start block --> */}
   <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* Start coding here */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {/* Button to open the create ticket modal */}
              <button onClick={openCreateModal}>Create New Ticket</button>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Ticket ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      User ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Subcategory
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Priority
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Assigned To
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Resolution Details
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id}>
                      <td className="px-4 py-4">{ticket._id}</td>
                      <td className="px-4 py-3">{ticket.user_id}</td>
                      <td className="px-4 py-3">{ticket.description}</td>
                      <td className="px-4 py-3">{ticket.category}</td>
                      <td className="px-4 py-3">{ticket.subcategory}</td>
                      <td className="px-4 py-3">{ticket.priority}</td>
                      <td className="px-4 py-3">{ticket.status}</td>
                      <td className="px-4 py-3">{ticket.assignedTo}</td>
                      <td className="px-4 py-3">{ticket.resolutionDetails}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(ticket._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
          
    </>
    
    );
};

export default viewTickets;
