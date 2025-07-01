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
      rotateToAngle(rotationRef, setRotationY, target);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-center gap-4 sm:gap-6">
        {["home", "about", "projects", "contact"].map((key) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className="px-5 py-2.5 bg-sky-300 bg-opacity-70 border-2 border-white rounded-full text-white font-semibold text-sm tracking-wider shadow-lg hover:text-amber-200 transition-colors"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
