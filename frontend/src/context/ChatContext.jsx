import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);

  const baseUrl = "http://localhost:3000/api"; // Replace with your actual base URL

  // Local getRequest function
  const getRequest = async (url) => {
    // Retrieve the token and user from localStorage
    const token = localStorage.getItem("Token");
    const user = JSON.parse(localStorage.getItem("User")); // Parse the JSON string

    console.log("User for request:", user);
    console.log("User role:", user.role);
    console.log("Token for request:", token);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        // Include 'credentials: "include"' only if you're using cookies for the token
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed response:", data);
        throw new Error(data.message || "Failed to fetch user chats");
      }

      return data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getUserChats = async () => {
      if (user && user._id) {
        setIsUserChatsLoading(true);
        setUserChatError(null);

        try {
          const response = await getRequest(`${baseUrl}/chat/${user._id}`);
          setUserChats(response);
          console.log("User chats fetched successfully:", response);
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

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
