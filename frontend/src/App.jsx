import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Login from "./pages/Login2";
import Chats from "./pages/Chat";
import Register from "./pages/SignUp";
import Tickets from "./pages/Tickets";
import UserSettings from "./pages/UserSettings";
import "./css/style.css";
import CurrentSettings from "./pages/CurrentSettings";
import "./charts/ChartjsConfig";
import MFAtotp from "./pages/MFA";
import AutomatedWorkflows from "./pages/AutomatedWorkflows";

import Logs from "./pages/Errorlogs";
// Import pages
import Dashboard from "./pages/Dashboard";
import FAQs from "./pages/FAQs";
import Customize from "./pages/Customize";
import SendEmail from "./pages/sendEmail";
import AddFAQs from "./pages/addFAQs";
import LandingPage from "./pages/LandingPage";
function App() {
  const { user } = useContext(AuthContext);
  console.log("user logged in ", user);
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <ChatContextProvider user={user}>
        <Routes>
          <Route path="/Home" element={<LandingPage />} />

          <Route
            exact
            path="/login"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route path="/chats" element={user ? <Chats /> : <Login />} />
          <Route
            path="/automatedWorflows"
            element={user ? <AutomatedWorkflows /> : <Login />}
          />

          <Route path="/FAQs" element={user ? <FAQs /> : <Login />} />
          <Route
            path="/settings"
            element={user ? <UserSettings /> : <Login />}
          />
          <Route path="/Customize" element={user ? <Customize /> : <Login />} />
          <Route path="/Mfa" element={user ? <Dashboard /> : <MFAtotp />} />
          <Route
            path="/userSettings"
            element={user ? <CurrentSettings /> : <Login />}
          />

          <Route path="/logs" element={user ? <Logs /> : <Login />} />
          <Route
            path="/register"
            element={user ? <Dashboard /> : <Register />}
          />
          <Route path="/tickets" element={user ? <Tickets /> : <Login />} />
          <Route path="/sendEmail" element={user ? <SendEmail /> : <Login />} />
          <Route path="/addFAQs" element={user ? <AddFAQs /> : <Login />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}

export default App;
