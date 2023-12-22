import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import MessageBox from "../partials/dashboard/MessageBox";
import ViewTickets from "../components/Tickets/viewTickets";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, currentChat, updateCurrentChat } =
    useContext(ChatContext);

  useEffect(() => {
    console.log("Current Chat:", currentChat);
  }, [currentChat]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div
          style={{
            padding: "20px", // Adjust the padding as needed
            marginTop: "5px", // Adjust the top margin as needed
            marginLeft: "20px", // Adjust the left margin as needed
            marginRight: "20px", // Adjust the right margin as needed
          }}
        >
          <MessageBox />
        </div>
        <div
          className="flex flex-col flex-grow p-4 chat-box"
          style={{
            backgroundColor: "rgba(30, 41, 59, 1)",
            padding: "20px", // Adjust the padding as needed
            // Adjust the top margin as needed
            marginBottom: "20px", // Adjust the bottom margin as needed
            marginLeft: "20px", // Adjust the left margin as needed
            marginRight: "20px", // Adjust the right margin as needed
          }}
        >
          <PotentialChats />
          {userChats?.length < 1 ? null : (
            <div className="flex gap-4 items-start">
              <div className="flex-grow-0 pe-3 flex flex-col gap-3">
                {isUserChatsLoading && <p>Loading Chats...</p>}
                {userChats?.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => updateCurrentChat(chat)}
                    className="hover:bg-gray-700 hover:cursor-pointer hover:shadow-md transition duration-300 ease-in-out rounded p-3"
                  >
                    <UserChat chat={chat} user={user} />
                  </div>
                ))}
              </div>
              <ChatBox />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
