import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [createChatError, setCreateChatError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setIsUserChatsLoading(true);
      try {
        const response = await getRequest(`${baseUrl}/support-agents`);
        if (response.error) {
          console.error("Error fetching support agents", response.error);
          setUserChatError(response.error);
        } else {
          const pChats = response.filter((u) => {
            let isChatCreated = false;

            if (user._id === u._id) {
              return false;
            }

            if (userChats) {
              isChatCreated = userChats.some((chat) => {
                return chat.members.includes(u._id);
              });
            }

            return !isChatCreated;
          });
          setPotentialChats(pChats);
        }
      } catch (error) {
        console.error("Error fetching support agents:", error);
        setUserChatError(
          error.message || "An error occurred while fetching support agents"
        );
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    if (user && user._id) {
      getUsers();
    }
  }, [user, userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user && user._id) {
        setIsUserChatsLoading(true);
        setUserChatError(null);

        try {
          const response = await getRequest(`${baseUrl}/chat/${user._id}`);
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

    getUserChats();
  }, [user]);

  const createChat = useCallback(async (userId, agentId) => {
    try {
      const response = await postRequest(
        `${baseUrl}/chat`,
        JSON.stringify({ userId, agentId })
      );

      if (response.error) {
        console.error("Error creating chat:", response);
        setCreateChatError(response.message || "Error creating chat");
        return;
      }

      setUserChats((prev) => [...prev, response]);
    } catch (error) {
      console.error("Error creating chat:", error);
      setCreateChatError(error.message);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        createChatError,
        potentialChats,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
