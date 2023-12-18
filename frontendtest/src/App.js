<<<<<<< HEAD
=======
// App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SecuritySettings from "./pages/securitySettings";
import SignUp from "./pages/SignUp";
import Tickets from './components/Tickets';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
>>>>>>> 9437ca9c7f54acc36387bec65fb88158b5576548
