import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const Tickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
      // Fetch data from the API endpoint
      axios.get("http://localhost:3000/api/tickets", {
      
      })
        .then(response => {
          // Set the fetched data to the state
          const responseData = response.data;
          const ticketsArray = responseData;

          console.log(response); // Add this line to log the data

          setTickets(ticketsArray);
        })
        .catch(error => {
          console.error('Error fetching tickets:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount
  
return (
    <>
    <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">

            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                
            <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-4 py-4">Product name</th>
            <th scope="col" class="px-4 py-3">Category</th>
            <th scope="col" class="px-4 py-3">Brand</th>
            <th scope="col" class="px-4 py-3">Description</th>
            <th scope="col" class="px-4 py-3">Price</th>
            <th scope="col" class="px-4 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td className="px-4 py-4">{ticket.productName}</td>
              <td className="px-4 py-3">{ticket.category}</td>
              <td className="px-4 py-3">{ticket.brand}</td>
              <td className="px-4 py-3">{ticket.description}</td>
              <td className="px-4 py-3">{ticket.price}</td>
              {/* ... rest of the code */}
            </tr>
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && <p>No tickets available.</p>}
    </div>
                
            </div>
        </div>
    </section>
    
    


    
    

    
    </>
    
    );
};

export default Tickets;
