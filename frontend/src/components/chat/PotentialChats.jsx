import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div className="potential-chats bg-gray-800 rounded-md shadow-md p-4 text-white">
      {potentialChats &&
        potentialChats.map((user, index) => {
          const isUserOnline = onlineUsers?.some(
            (onlineUser) => onlineUser?.userId === user?._id
          );

          return (
            <div
              key={index}
              className={`chat-user cursor-pointer flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-700 rounded-md transition duration-300 ease-in-out`}
              onClick={() => createChat(user._id, user._id)}
            >
              <div className="flex items-center">
                <span className="font-bold">{user.name}</span>
                <span
                  className={`text-${isUserOnline ? "green" : "gray"}-500 ml-2`}
                >
                  {isUserOnline ? "Online" : "Offline"}
                </span>
              </div>
              <span className="text-lg">
                <FontAwesomeIcon
                  icon={isUserOnline ? faCheckCircle : faTimesCircle}
                  className={`text-${isUserOnline ? "green" : "red"}-500`}
                />
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
