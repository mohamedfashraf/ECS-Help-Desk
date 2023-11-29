import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello, React with Vite!</h1>
      <Login />
    </div>
  );
}
export default App;
