import { SceneRotation } from "./helpers/SceneRotation";
import { useRef } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

function App() {
  const rotationRef = useRef();

  return (
      <SceneRotation.Provider value={{ rotationRef }}>
        <Navbar />
        <Home rotationRef={rotationRef} />
      </SceneRotation.Provider>
  );
}

export default App;
