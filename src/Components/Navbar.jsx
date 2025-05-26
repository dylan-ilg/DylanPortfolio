import React, { useEffect } from "react";
import { useSceneRotation } from "../helpers/SceneRotation";
import { rotateToAngle, NAV_ROTATIONS } from "../helpers/RotationHelper";

function Navbar() {
  const { rotationRef, setRotationY } = useSceneRotation();

  useEffect(() => {
    console.log("🧠 Navbar rendered");
  }, []);

  const handleNavClick = (targetKey) => {
    console.log(`[NAVBAR] Clicked: ${targetKey}`);
    const target = NAV_ROTATIONS[targetKey];
    if (rotationRef?.current) {
      rotateToAngle(rotationRef, setRotationY, target); // ✅ Pass setRotationY
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header flex items-center">
      <button
        onClick={() => handleNavClick("home")}
        className="bg-sky-300 bg-opacity-70 border-2 border-white rounded-lg p-6 backdrop-blur-md shadow-lg"
      >
        <p className="text-white font-semibold text-lg underline hover:text-amber-200 transition">Home</p>
      </button>

      {["about", "projects", "contact"].map((key) => (
        <button
          key={key}
          onClick={() => handleNavClick(key)}
          className="bg-sky-300 bg-opacity-70 border-2 border-white rounded-lg p-6 backdrop-blur-md shadow-lg text-white font-semibold text-lg underline hover:text-amber-200 transition"
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
      ))}
    </header>
  );
}

export default Navbar;