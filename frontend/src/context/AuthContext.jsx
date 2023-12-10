import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Restore user and token from localStorage
    const storedUserData = localStorage.getItem("User");
    const storedToken = localStorage.getItem("Token");
    // console.log("storedToken", storedToken);
    if (storedUserData && storedToken) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData); // Ensure this matches the structure of your user data
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/v1/register`,
        JSON.stringify(registerInfo)
      );

      setRegisterLoading(false);

      if (response.error) {
        setRegisterError(response);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response.user);
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);

      try {
        const response = await fetch(`${baseUrl}/v1/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        });

        const responseData = await response.json();

        setLoginLoading(false);

        if (response.ok) {
          console.log(
            "Login successful, storing user and token in localStorage"
          );
          localStorage.setItem("User", JSON.stringify(responseData.user));
          localStorage.setItem("Token", responseData.token);
          setUser(responseData.user);
        } else {
          console.error("Login failed");
          setLoginError("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginError(error.message || "An error occurred during login");
      }
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    console.log("Logging out, clearing user and token from localStorage");
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        registerLoading,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        loginError,
        loginLoading,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
