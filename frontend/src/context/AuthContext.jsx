import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";
import { baseUrl } from "../utils/services";
import axios from "axios";

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
    async (userEnteredToken) => {
      setLoginLoading(true);
      setLoginError(null);

      try {
        let response;
        let responseData;

        // Check if MFA token is provided
        if (userEnteredToken) {
          // If MFA token is provided, verify it
          response = await fetch(`${baseUrl}/v1/verifyMFA`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: loginInfo.userId,
              mfaToken: userEnteredToken,
            }),
          });
        } else {
          // If no MFA token, attempt initial login
          response = await fetch(`${baseUrl}/v1/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
          });
        }

        responseData = await response.json();
        setLoginLoading(false);

        if (response.ok) {
          // Check if the response indicates MFA is required
          if (responseData.message === "MFA required") {
            sessionStorage.setItem("userIdForMFA", responseData.userId); // Store userId

            return {
              isSuccess: false,
              twoFactorAuthRequired: true,
            };
          }

          // Handle successful login or MFA verification
          localStorage.setItem("User", JSON.stringify(responseData.user));
          localStorage.setItem("Token", responseData.token);
          setUser(responseData.user);

          return {
            isSuccess: true,
            twoFactorAuthRequired: false,
          };
        } else {
          setLoginError(responseData.message || "Login failed");
          return {
            isSuccess: false,
            twoFactorAuthRequired: false,
          };
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginError(error.message || "An error occurred during login");
        return { isSuccess: false, twoFactorAuthRequired: false };
      }
    },
    [loginInfo]
  );
  const verifyMFA = async (mfaCode) => {
    console.log("Verifying MFA code:", mfaCode); // Debugging line
    const userId = sessionStorage.getItem("userIdForMFA"); // Retrieve userId
    if (!userId) {
      throw new Error("User ID not found for MFA verification");
    }

    try {
      const response = await fetch(`${baseUrl}/v1/verifyMFA`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, mfaToken: mfaCode }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Handle successful verification
        localStorage.setItem("User", JSON.stringify(responseData.user));
        localStorage.setItem("Token", responseData.token);
        setUser(responseData.user); // Assuming setUser updates the AuthContext
        return { isSuccess: true };
      } else {
        return { isSuccess: false, message: responseData.message };
      }
    } catch (error) {
      console.error("Error verifying MFA:", error);
      return {
        isSuccess: false,
        message: error.message || "An error occurred during MFA verification",
      };
    }
  };

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
        verifyMFA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
