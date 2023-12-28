import { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser, loading, error } = useFetchRecipientUser(
    currentChat,
    user
  );

  const [textMessage, setTextMessage] = useState("");
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    await sendTextMessage(textMessage, user, currentChat._id, sendTextMessage);
    setTextMessage(""); // Reset the input after sending
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the newline character
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the last message when messages are updated
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-grow p-4 chat-box h-full bg-gray-800 rounded-lg shadow-md text-white">
      <div className="flex-shrink-0 mb-4">
        <div className="chat-header">
          <strong className="text-xl text-blue-300">
            {recipientUser?.name}
          </strong>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto messages"
        style={{ maxHeight: "500px" }}
      >
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
                  ? "self-message-box bg-blue-500 text-white"
                  : "other-message-box bg-gray-700 text-white"
              } p-2 rounded shadow-md`}
            >
              <span className="text-md break-words">{message.text}</span>
              <br />
              <span className="message-footer text-sm text-gray-300">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-3 chat-input mt-4">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          onKeyPress={handleKeyPress} // Handle "Enter" key press
          fontFamily="Your-Font-Family" // Replace with your desired font family
          borderColor="rgba(72,112,223,0.2)"
          className="flex-1 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-600"
          ref={inputRef}
        />
        <button
          className="send-btn bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSendMessage}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
