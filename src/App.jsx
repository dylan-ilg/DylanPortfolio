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
      <Home
        rotationRef={rotation.rotationRef}
        isRotating={rotation.isRotating}
        onPointerDown={rotation.onPointerDown}
        onPointerMove={rotation.onPointerMove}
        onPointerUp={rotation.onPointerUp}
        rotationSpeed={rotation.rotationSpeed}
        setRotationY={rotation.setRotationY}
      />
    </SceneRotation.Provider>
  );
}

export default App;
