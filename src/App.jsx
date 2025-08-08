import React from "react";
import "./App.css";
import { SceneRotation } from "./helpers/SceneRotation";
import useRotationHelper from "./helpers/RotationHelper";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  const rotation = useRotationHelper();

  return (
    <SceneRotation.Provider value={rotation}>
      <Navbar />
      <main className="relative min-h-screen bg-black text-white">
        <Home />
      </main>
    </SceneRotation.Provider>
  );
}

export default App;
