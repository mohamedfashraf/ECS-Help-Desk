import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Login from "./pages/Login2";
import Chats from "./pages/Chat";
import Register from "./pages/SignUp";
import Tickets from "./pages/Tickets";

import "./css/style.css";

import "./charts/ChartjsConfig";
import "./css/style.css";

import "./charts/ChartjsConfig";
import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";

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
          <Route
            exact
            path="/login"
            element={user ? <Dashboard /> : <Login />}
          />
          <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
          {<Route exact path="*" element={<Navigate to="/" />} />}
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route path="/chats" element={user ? <Chats /> : <Login />} />
          <Route path="/tickets" element={user ? <Tickets /> : <Login />} />

          <Route
            path="/register"
            element={user ? <Dashboard /> : <Register />}
          />
          <Route path="/tickets" element={user ? <Tickets /> : <Login />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}

export default App;
