import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import MessageBox from "../partials/dashboard/MessageBox";
import Logs from "../components/Logs";

const Tickets = () => {
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
        ></div>
        <div
          className="flex flex-col flex-grow"
          style={{
            // Adjust the top margin as needed
            marginBottom: "20px", // Adjust the bottom margin as needed
            marginLeft: "20px", // Adjust the left margin as needed
            marginRight: "20px", // Adjust the right margin as needed
          }}
        >
          <Logs />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
