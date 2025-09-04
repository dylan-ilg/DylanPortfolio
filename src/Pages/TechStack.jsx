import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SiReact,
  SiMui,
  SiJavascript,
  SiThreedotjs,
  SiCss3,
  SiHtml5,
  SiPython,
  SiDjango,
  SiC,
  SiApachemaven,
  SiPostgresql,
  SiJunit5,
  SiPostman,
  SiFigma,
  SiSwagger,
  SiGit,
  SiGithub,
  SiJira,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

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

const SECTIONS = [
  {
    title: "Front End",
    items: [
      { name: "React", icon: <SiReact className="w-8 h-8 text-cyan-400" /> },
      { name: "MUI", icon: <SiMui className="w-8 h-8 text-sky-400" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-8 h-8 text-yellow-400" /> },
      { name: "ThreeJS", icon: <SiThreedotjs className="w-8 h-8 text-gray-200" /> },
      { name: "CSS", icon: <SiCss3 className="w-8 h-8 text-blue-500" /> },
      { name: "HTML", icon: <SiHtml5 className="w-8 h-8 text-orange-500" /> },
    ],
  },
  {
    title: "Back End",
    items: [
      { name: "Python", icon: <SiPython className="w-8 h-8 text-blue-400" /> },
      { name: "Java", icon: <FaJava className="w-8 h-8 text-red-500" /> },
      { name: "C", icon: <SiC className="w-8 h-8 text-blue-600" /> },
      { name: "Django", icon: <SiDjango className="w-8 h-8 text-green-500" /> },
      { name: "DRF", icon: <TbApi className="w-8 h-8 text-rose-400" /> },
      { name: "Maven", icon: <SiApachemaven className="w-8 h-8 text-red-600" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8 text-sky-400" /> },
    ],
  },
  {
    title: "Testing / Deployment",
    items: [
      { name: "AWS", icon: <FaAws className="w-8 h-8" /> },
      { name: "JUnit", icon: <SiJunit5 className="w-8 h-8 text-green-600" /> },
      { name: "Postman", icon: <SiPostman className="w-8 h-8 text-orange-500" /> },
      { name: "Figma", icon: <SiFigma className="w-8 h-8 text-pink-500" /> },
      { name: "Swagger", icon: <SiSwagger className="w-8 h-8 text-green-500" /> },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      { name: "Git", icon: <SiGit className="w-8 h-8 text-orange-600" /> },
      { name: "GitHub", icon: <SiGithub className="w-8 h-8 text-gray-200" /> },
      { name: "Jira", icon: <SiJira className="w-8 h-8 text-blue-500" /> },
    ],
  },
];

const TechStack = () => {
  const { rotationY } = useSceneRotation();

  const targetAngle = useMemo(() => {
    const hasKey = NAV_ROTATIONS && Number.isFinite(NAV_ROTATIONS.techstack);
    return hasKey
        ? NAV_ROTATIONS.techstack
        : midpointAngle(NAV_ROTATIONS.projects, NAV_ROTATIONS.contact);
  }, []);

  const isVisible = isInViewRange(rotationY, targetAngle, 0.5);

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
        <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-900/40 text-cyan-200 font-semibold text-lg rounded-full border border-white hover:bg-cyan-900/55 transition"
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
                  className="mt-6 bg-cyan-900/40 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-cyan-200 overflow-hidden"
              >

                <div
                    className="
                p-6
                overflow-y-auto
                max-h-[calc(100dvh-9rem)]
                sm:max-h-[400px]
                overscroll-contain
                [touch-action:pan-y]
              "
                    style={{ WebkitOverflowScrolling: "touch" }}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-bold mb-2 text-cyan-100 drop-shadow">
                    Tools I Work With
                  </h2>
                  <p className="mb-6 max-w-3xl mx-auto">
                    I ship with React on the front end and Python/Django on the back,
                    and use modern tooling end-to-end.
                  </p>

                  {SECTIONS.map((section, sIdx) => (
                      <div key={section.title} className={sIdx > 0 ? "mt-8" : ""}>
                        <h3 className="text-xl font-semibold mb-4 text-cyan-100 drop-shadow">
                          {section.title}
                        </h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
                          {section.items.map((t) => (
                              <div
                                  key={t.name}
                                  className="flex flex-col items-center hover:scale-110 transition-transform"
                              >
                                {t.icon}
                                <span className="text-sm mt-1 text-cyan-100 drop-shadow-sm">
                          {t.name}
                        </span>
                              </div>
                          ))}
                        </div>
                      </div>
                  ))}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};

export default TechStack;
