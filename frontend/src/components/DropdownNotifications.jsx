import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Transition from "../utils/Transition";
import { baseUrl } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

function DropdownNotifications({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const { user } = useContext(AuthContext);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const userEmail = user.email;
  console.log("userEmail", userEmail);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/emails/inbox"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleClickReadMore = () => {
    setDropdownOpen(false);
    // Add logic to navigate to the notifications page or show more notifications
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* ... (your existing icon) */}
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        // ... (your existing transition code)
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            {notifications
              .slice(0, showReadMore ? notifications.length : 3)
              .map((notification, index) => (
                <li
                  key={index}
                  className={`border-b border-slate-200 dark:border-slate-700 ${
                    index === notifications.length - 1 ? "last:border-0" : ""
                  }`}
                >
                  {/* ... (your existing notification item code) */}
                </li>
              ))}
          </ul>
          {notifications.length > 3 && (
            <div className="px-4 pb-2 text-center">
              <button
                className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-600"
                onClick={handleClickReadMore}
              >
                {showReadMore ? "Show Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
