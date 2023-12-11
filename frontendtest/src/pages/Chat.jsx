import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatError } =
    useContext(ChatContext);
  console.log("userChats", userChats);
  return (
    <div>
      <h1>Chats</h1>
      {isUserChatsLoading ? (
        <p>Loading...</p>
      ) : (
        userChats?.map((chat) => <p key={chat._id}>{chat.title}</p>)
      )}
      {userChatError && <p>Error: {userChatError.message}</p>}
    </div>
  );
};

export default Chat;
