import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import WCard from "./components/wcard/WCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="weather_body">
      <Navbar />
      <WCard />
    </div>
  );
}

export default App;
