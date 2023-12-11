// ChatBox.jsx

import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { AuthContext } from "../../context/AuthContext";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, updateCurrentChat } =
    useContext(ChatContext);
  const { recipientUser, loading, error } = useFetchRecipientUser(
    currentChat,
    user
  );

  if (!recipientUser) {
    console.log("No recipientUser");
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No Conversation selected yet...
      </p>
    );
  }

  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );
  }

  return (
    <>
      <Stack gap={4} className="chat-box">
        <div className="chat-header">
          <strong>{recipientUser?.name}</strong>
        </div>
        <Stack gap={3} className="messages">
          {messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ChatBox;
