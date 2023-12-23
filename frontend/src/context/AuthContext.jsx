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
    userEnteredToken: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    userEnteredToken: "",
  });

  const loginUserWithGoogle = useCallback(async (googleToken) => {
    try {
      // Send token to your backend for verification
      const response = await fetch(`${baseUrl}/v1/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Update user state and store in localStorage
        localStorage.setItem("User", JSON.stringify(responseData.user));
        localStorage.setItem("Token", responseData.token);
        setUser(responseData.user);
      } else {
        console.error("Error during Google login");
        // Handle error
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      // Handle error
    }
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("User");
    const storedToken = localStorage.getItem("Token");

    if (storedUserData && storedToken) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle parsing error (e.g., clear localStorage, redirect to login)
      }
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
                localStorage.setItem("User", JSON.stringify(responseData.user));
        localStorage.setItem("Token", responseData.token);
        setUser(responseData.user);
        
          return {
            isSuccess: true,
            twoFactorAuthEnabled: responseData.twoFactorAuthEnabled,
          };
      } else {
        setLoginError("Login failed");
return {
            isSuccess: false,
            twoFactorAuthEnabled: false,
          };
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(error.message || "An error occurred during login");
      return {
          isSuccess: false,
          twoFactorAuthEnabled: false,
        };
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
        loginUserWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
