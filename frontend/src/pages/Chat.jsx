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
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="p-4">
          <MessageBox />
        </div>
        <div className="flex flex-col flex-grow p-4 chat-box bg-gray-800 rounded-lg shadow-md text-white">
          <PotentialChats />
          {userChats?.length < 1 ? null : (
            <div className="flex gap-4 items-start">
              <div className="flex-grow-0 pe-3 flex flex-col gap-3">
                {isUserChatsLoading && <p>Loading Chats...</p>}
                {userChats?.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => updateCurrentChat(chat)}
                    className="hover:bg-gray-700 cursor-pointer shadow-md transition duration-300 ease-in-out rounded p-3"
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
