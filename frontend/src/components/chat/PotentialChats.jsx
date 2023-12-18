import { useContext } from "react";
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

  console.log("onlineUsers:", onlineUsers);

  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats.map((u, index) => {
          const isUserOnline = onlineUsers?.some(
            (onlineUser) => onlineUser?.userId === u?._id
          );

          return (
            <div
              key={index}
              className={`single-user cursor-pointer flex items-center justify-between px-4 py-2 border-b border-gray-300 hover:bg-gray-100`}
              onClick={() => createChat(user._id, u._id)}
            >
              <div className="flex items-center">
                <span className="font-bold">{u.name}</span>
                {isUserOnline ? (
                  <span className="text-green-500 ml-1">Online</span>
                ) : (
                  <span className="text-gray-500 ml-1">Offline</span>
                )}
              </div>
              <span className="text-lg">
                {isUserOnline ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500"
                  />
                )}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
