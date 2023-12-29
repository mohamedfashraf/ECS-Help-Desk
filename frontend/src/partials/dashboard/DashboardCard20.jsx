import React, { useState, useEffect, useContext } from "react";
import Icon from "../../images/icon-02.svg";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function DashboardCard02() {
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newInfo, setNewInfo] = useState({
    description: "",
    category: "Software",
    subCategory: "",
    priority: "Low",
  });

  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [rating, setRating] = useState(0); // State for rating
  const [ratingConfirmation, setRatingConfirmation] = useState("");

  const fetchUserTickets = async () => {
    // Existing fetchUserTickets logic...
  };

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const showConfirmationMessage = (message) => {
    // Existing showConfirmationMessage logic...
  };

  const handleTicketSelect = (ticket) => {
    // Existing handleTicketSelect logic...
  };

  const handleUpdate = async () => {
    // Existing handleUpdate logic...
  };

  // Function to handle rating submission
  const handleRatingSubmit = () => {
    console.log("Rating submitted:", rating);
    setRatingConfirmation("Thank you for your rating!");

    // Reset rating confirmation message after 3 seconds
    setTimeout(() => {
      setRatingConfirmation("");
    }, 3000);
  };

  return (
    <div className="relative flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:border-gray-700 sm:p-6 dark:bg-gray-800 shadow-lg rounded-lg border border-slate-200">
      {/* Existing JSX... */}

      {/* Rating Section */}
      <div className="mt-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Rating
        </label>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={index <= rating ? "text-yellow-500" : "text-gray-400"}
              onClick={() => setRating(index)}
            >
              <span className="text-2xl">&#9733;</span>
            </button>
          );
        })}
        <button
          onClick={handleRatingSubmit}
          className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          Submit Rating
        </button>
        {ratingConfirmation && (
          <div className="mt-2 text-sm text-green-600">
            {ratingConfirmation}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard02;
