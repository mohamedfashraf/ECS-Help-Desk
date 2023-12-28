import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({ chat, user }) => {
  const { recipientUser, lastMessage } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers.some(
    (user) => user?.userId === recipientUser?._id
  );

  return (
    <div className="border-b border-gray-300 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="me-4">
          <FontAwesomeIcon
            icon={faUser}
            size="lg" // Adjust the size as needed
            className="h-12 w-12 rounded-full text-gray-500" // Adjust the styling as needed
          />
        </div>
        <div className="text-content">
          <div className="text-lg font-semibold">{recipientUser?.name}</div>
          <div className="text-sm text-gray-500">
            Last message: {lastMessage?.text}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-gray-500">
          {lastMessage ? formatDate(lastMessage.createdAt) : ""}
        </div>
        <div className="this-user-notifications bg-blue-500 text-white rounded-full p-1 text-xs">
          2
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={isOnline ? faCheckCircle : faTimesCircle}
            className={isOnline ? "text-green-500" : "text-red-500"}
          />
          <span
            className={`user-status ${
              isOnline ? "text-green-500" : "text-red-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default UserChat;
