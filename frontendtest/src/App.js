// import SignupComponent from "./components/SignUp";
// import IntegratedMessaging from "./components/integratedMessaging";
import { ChatContextProvider } from "./context/ChatContext";
// return <SignupComponent />;
// return <IntegratedMessaging />;
function App() {
  const { user } = {
    _id: "65639437a2c4a0be6c7da715",
  };

  return <ChatContextProvider user={user} />;
}
export default App;
