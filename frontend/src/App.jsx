import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Chat from "./pages/Chat";
import Login from "./pages/Login2";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="/login2" element={user ? <Chat /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );    
}
export default App;
