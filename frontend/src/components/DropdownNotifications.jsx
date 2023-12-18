import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownNotifications = ({ align }) => {
  const [messages, setMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("Token");

        const response = await axios.get(
          "http://localhost:3000/api/emails/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedMessages = response.data.messages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [dropdownOpen]);

  const handleClickShowMore = () => {
    setShowAllMessages(!showAllMessages);
  };

  const handleClickIcon = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  const handleClickOutside = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={handleClickIcon}
        aria-expanded={dropdownOpen}
      >
        <FontAwesomeIcon icon={faBell} />
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            {messages
              .slice(0, showAllMessages ? messages.length : 5)
              .map((message, index) => (
                <li
                  key={index}
                  className={`border-b border-slate-200 dark:border-slate-700 ${
                    index === messages.length - 1 ? "last:border-0" : ""
                  }`}
                >
                  <Link
                    className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                    to="#0"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="block text-sm mb-2">
                      {message.message}
                    </span>
                    <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
          {messages.length > 5 && (
            <div className="px-4 pb-2 text-center">
              <button
                className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-600"
                onClick={handleClickShowMore}
              >
                {showAllMessages ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default DropdownNotifications;
