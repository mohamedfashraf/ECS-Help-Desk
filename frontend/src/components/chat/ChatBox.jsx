import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useState } from "react";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser, loading, error } = useFetchRecipientUser(
    currentChat,
    user
  );

  const [textMessage, setTextMessage] = useState("");

  if (!recipientUser) {
    return (
      <p className="text-center w-full">No Conversation selected yet...</p>
    );
  }

  if (isMessagesLoading) {
    return <p className="text-center w-full">Loading chat...</p>;
  }

  return (
    <div className="flex flex-col flex-grow p-4 chat-box h-full">
      <div className="flex-shrink-0 mb-6">
        <div className="chat-header">
          <strong className="text-lg">{recipientUser?.name}</strong>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto messages mb-10">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message?.senderId === user?._id
                ? "self-message flex justify-end mb-4"
                : "other-message flex justify-start mb-4"
            }`}
          >
            <div
              className={`${
                message?.senderId === user?._id
                  ? "self-message-box bg-green-500 text-white"
                  : "other-message-box bg-gray-300 text-black"
              } p-2 rounded`}
            >
              <span className="text-md break-words">{message.text}</span>
              <span className="message-footer text-sm text-gray-500">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3 chat-input">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
          className="flex-1"
        />
        <button
          className="send-btn bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={async () =>
            sendTextMessage(textMessage, user, currentChat._id, sendTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
w