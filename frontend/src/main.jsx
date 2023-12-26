import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext"; // Imported ThemeProvider
import App from "./App";
import "./index2.css"; // Assuming you still need these CSS imports
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext"; // Assuming you still need the AuthContextProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
