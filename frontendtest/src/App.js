
// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatComponent from './components/ChatComponent';
import Login from './pages/Login';
import SecuritySettings from './pages/securitySettings';
import SignUp from './pages/SignUp';
import { ChatContextProvider } from "./context/ChatContext";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
