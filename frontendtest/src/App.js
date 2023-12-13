// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Tickets from './components/Tickets';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
};

export default App;
