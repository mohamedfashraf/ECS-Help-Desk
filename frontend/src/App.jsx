import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Login from "./pages/Login2"
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ... other imports remain the same

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Chat page if the user is logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate replace to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to={user ? "/" : "/login"} />} />
    
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;