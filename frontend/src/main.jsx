import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext"; // Imported ThemeProvider
import App from "./App";
import "./index2.css"; // Assuming you still need these CSS imports
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext"; // Assuming you still need the AuthContextProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        {" "}
        {/* Added ThemeProvider here */}
        <AuthContextProvider>
          {" "}
          {/* Keep existing AuthContextProvider */}
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
