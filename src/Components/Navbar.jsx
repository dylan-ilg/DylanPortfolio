import React, { useEffect, useMemo } from "react";
import { useSceneRotation } from "../helpers/SceneRotation";
import { rotateToAngle, NAV_ROTATIONS } from "../helpers/RotationHelper";

function angleDiff(a, b) {
  const TWO_PI = Math.PI * 2;
  let d = (b - a) % TWO_PI;
  if (d > Math.PI) d -= TWO_PI;
  if (d < -Math.PI) d += TWO_PI;
  return d;
}

function midpointAngle(a, b) {
  const d = angleDiff(a, b);
  let m = a + d / 2;
  const TWO_PI = Math.PI * 2;
  m = ((m % TWO_PI) + TWO_PI) % TWO_PI;
  return m;
}

function Navbar() {
  const { rotationRef, setRotationY } = useSceneRotation();

  // Compute Tech Stack target **between** Projects and Contact
  const TECH_STACK_TARGET = useMemo(
    () => midpointAngle(NAV_ROTATIONS.projects, NAV_ROTATIONS.contact),
    []
  );

  useEffect(() => {
    console.log("🧠 Navbar rendered");
  }, []);

  const handleNavClick = (targetKey) => {
    console.log(`[NAVBAR] Clicked: ${targetKey}`);
    let target;

    if (targetKey === "techstack") {
      target = TECH_STACK_TARGET;
    } else {
      target = NAV_ROTATIONS[targetKey];
    }

    if (typeof target !== "number") {
      console.warn(`[NAVBAR] Unknown target key: ${targetKey}`);
      return;
    }

    if (rotationRef?.current) {
      rotateToAngle(rotationRef, setRotationY, target);
    } else {
      console.warn("[NAVBAR] rotationRef not ready");
    }
  };

  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "techstack", label: "Tech Stack" }, // <-- NEW
    { key: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-center gap-4 sm:gap-6">
        {items.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className="px-5 py-2.5 bg-sky-300 bg-opacity-70 border-2 border-white rounded-full text-white font-semibold text-sm tracking-wider shadow-lg hover:text-amber-200 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Navbar;
