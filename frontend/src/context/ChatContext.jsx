// ChatContext.jsx

import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { set } from "mongoose";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Check if user exists and has _id property
        if (!user || !user._id) {
          console.error("User is null or does not have an _id property");
          return;
        }

        const response = await getRequest(`${baseUrl}/support-agents`);
        console.log("Users response:", response);

        if (response.error) {
          console.error("Error getting users:", response.error);
          return;
        }

        const pChats = response.filter((u) => {
          let isChatCreated = false;

          // Check if userChats is defined and has length
          if (userChats && userChats.length > 0) {
            isChatCreated = userChats.some((chat) => {
              // Check if chat.members is defined before accessing its elements
              return (
                chat.members &&
                (chat.members[0] === u._id || chat.members[1] === u._id)
              );
            });
          }

          return !isChatCreated;
        });

        console.log("Potential Chats:", pChats);
        setPotentialChats(pChats);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    getUsers();
  }, [user, userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user && user._id) {
        setIsUserChatsLoading(true);
        setUserChatError(null);

        try {
          const response = await getRequest(`${baseUrl}/chat/${user._id}`);
          console.log("User Chats response:", response);

          if (response.error) {
            setUserChatError(response.error);
          } else {
            setUserChats(response.chats || []);
          }
        } catch (error) {
          console.error("Error during fetching user chats:", error);
          setUserChatError(
            error.message || "An error occurred while fetching chats"
          );
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };

    // Call getUserChats
    getUserChats();

    // Check if there's a new message and update messages state
    if (newMessage && newMessage.chatId) {
      // Fetch the latest messages for the current chat
      const updatedMessages = getRequest(
        `${baseUrl}/message/${newMessage.chatId}`
      );

      // Update the messages state with the latest messages
      setMessages(updatedMessages.messages || []);
    }
  }, [user, newMessage]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      try {
        if (!currentChat) {
          // If there is no current chat, set messages to an empty array
          setMessages([]);
          return;
        }

        const response = await getRequest(
          `${baseUrl}/message/${currentChat._id}`
        );
        setIsMessagesLoading(false);

        if (response.error) {
          setMessagesError(response);
        } else {
          setMessages(response.messages || []);
        }
      } catch (error) {
        setIsMessagesLoading(false);
        setMessagesError("An error occurred while fetching messages");
      }
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      try {
        if (!textMessage) {
          return console.log("You must type something...");
        }

        const response = await postRequest(
          `${baseUrl}/message`,
          JSON.stringify({
            text: textMessage,
            senderId: sender,
            chatId: currentChatId,
          })
        );

        if (response.error) {
          setSendTextMessageError(response);
        }

        setNewMessage(response);

        // Update messages by fetching the latest messages after sending a new message
        const updatedMessages = await getRequest(
          `${baseUrl}/message/${currentChatId}`
        );

        setMessages(updatedMessages.messages || []);

        setTextMessage("");
      } catch (error) {
        console.error("Error sending text message:", error);
      }
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postRequest(
        `${baseUrl}/chat`,
        JSON.stringify({ firstId, secondId })
      );

      console.log("Create Chat response:", response);

      if (response.error) {
        return console.error("Error creating chat:", response);
      }

      setUserChats((prev) => [...prev, response]);

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
