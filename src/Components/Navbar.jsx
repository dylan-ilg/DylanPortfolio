import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const TECH_STACK_TARGET = useMemo(
    () => midpointAngle(NAV_ROTATIONS.projects, NAV_ROTATIONS.contact),
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = useCallback(
    (targetKey) => {
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

      setIsOpen(false);
    },
    [rotationRef, setRotationY, TECH_STACK_TARGET]
  );

  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "techstack", label: "Tech Stack" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        <nav className="hidden sm:flex justify-center gap-4 sm:gap-6 w-full">
          {items.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="px-5 py-2.5 bg-sky-300 bg-opacity-70 border-2 border-white rounded-full text-white font-semibold text-sm tracking-wider shadow-lg hover:text-amber-200 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex sm:hidden ml-auto">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md border border-white/70 bg-sky-300/70 text-white focus:outline-none focus:ring-2 focus:ring-white/70"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            {/* Hamburger icon */}
            <svg
              className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close (X) icon */}
            <svg
              className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={`sm:hidden transition-all duration-200 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        <nav className="max-w-5xl mx-auto px-4 pb-3 pt-1">
          <ul className="flex flex-col gap-2">
            {items.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => handleNavClick(key)}
                  className="w-full text-left px-4 py-3 bg-sky-300/80 border-2 border-white rounded-xl text-white font-medium shadow hover:text-amber-200 transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
