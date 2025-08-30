import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiPython,
  SiDjango,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiVite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";

/* --- angle helpers so TechStack can live between Projects and Contact
       even if NAV_ROTATIONS.techstack isn't defined --- */
const TWO_PI = Math.PI * 2;
function angleDiff(a, b) {
  let d = (b - a) % TWO_PI;
  if (d > Math.PI) d -= TWO_PI;
  if (d < -Math.PI) d += TWO_PI;
  return d;
}
function midpointAngle(a, b) {
  let m = a + angleDiff(a, b) / 2;
  return ((m % TWO_PI) + TWO_PI) % TWO_PI;
}

const items = [
  { name: "React", icon: <SiReact className="w-8 h-8" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-8 h-8" /> },
  { name: "Python", icon: <SiPython className="w-8 h-8" /> },
  { name: "Django", icon: <SiDjango className="w-8 h-8" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8" /> },
  { name: "HTML5", icon: <SiHtml5 className="w-8 h-8" /> },
  { name: "CSS3", icon: <SiCss3 className="w-8 h-8" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="w-8 h-8" /> },
  { name: "Vite", icon: <SiVite className="w-8 h-8" /> },
  { name: "Java", icon: <FaJava className="w-8 h-8" /> },
  { name: "C++", icon: <TbBrandCpp className="w-8 h-8" /> },
];

const TechStack = () => {
  const { rotationY } = useSceneRotation();

  // Use NAV_ROTATIONS.techstack if available, otherwise midpoint between Projects and Contact
  const targetAngle = useMemo(() => {
    const hasKey =
      NAV_ROTATIONS && Number.isFinite(NAV_ROTATIONS.techstack);
    return hasKey
      ? NAV_ROTATIONS.techstack
      : midpointAngle(NAV_ROTATIONS.projects, NAV_ROTATIONS.contact);
  }, []);

  const isVisible = isInViewRange(rotationY, targetAngle, 0.5);

  // Starts collapsed; only opens on user click
  const [expanded, setExpanded] = useState(false);
  const toggleCard = () => setExpanded((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`absolute top-32 left-1/2 transform -translate-x-1/2 z-40 text-center w-full max-w-5xl px-4 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* 🔘 The button you wanted, same styling + chevron icon + "Tech Stack" label */}
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-cyan-100 font-semibold text-lg rounded-full border border-white hover:bg-opacity-30 transition"
        onClick={toggleCard}
      >
        {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        Tech Stack
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="techstack-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-indigo-400/80 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-white overflow-hidden"
          >
            <div
              className="overflow-y-auto p-6"
              style={{ maxHeight: "400px" }}
              onWheel={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Tools I Work With</h2>
              <p className="mb-6 max-w-3xl mx-auto">
                I ship with React + Tailwind on the front, Python/Django or Node on the back, and modern tooling end-to-end.
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
                {items.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col items-center hover:scale-110 transition-transform"
                  >
                    {t.icon}
                    <span className="text-sm mt-1">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TechStack;
