import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";

// Icons
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiPython,
  SiDjango,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFirebase,
  SiNodedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";

const technologies = [
  { name: "React", icon: <SiReact className="w-8 h-8 text-cyan-400" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-8 h-8 text-yellow-400" /> },
  { name: "Python", icon: <SiPython className="w-8 h-8 text-blue-400" /> },
  { name: "Django", icon: <SiDjango className="w-8 h-8 text-green-500" /> },
  { name: "HTML5", icon: <SiHtml5 className="w-8 h-8 text-orange-500" /> },
  { name: "CSS3", icon: <SiCss3 className="w-8 h-8 text-blue-500" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="w-8 h-8 text-cyan-300" /> },
  { name: "Firebase", icon: <SiFirebase className="w-8 h-8 text-yellow-500" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8 text-green-400" /> },
  { name: "Java", icon: <FaJava className="w-8 h-8 text-red-500" /> },
  { name: "C++", icon: <TbBrandCpp className="w-8 h-8 text-indigo-400" /> },
];

const About = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.about, 0.5);

  // User controls this; we do NOT tie it to visibility so it persists.
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => setExpanded((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`absolute top-32 left-1/2 transform -translate-x-1/2 z-40 text-center w-full max-w-5xl px-4
        ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      // keep it mounted always so state persists across rotations
    >
      {/* Toggle button */}
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-cyan-100 font-semibold text-lg rounded-full border border-white hover:bg-opacity-30 transition drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
        onClick={toggleCard}
      >
        {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        About Me
      </button>

      {/* Collapsible content stays mounted with AnimatePresence controlling inner panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="about-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-sky-300 bg-opacity-80 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-cyan-100 overflow-hidden"
          >
            <div
              className="overflow-y-auto p-6"
              style={{ maxHeight: "400px" }}
              onWheel={(e) => e.stopPropagation()} // let user scroll inside without rotating the planet
            >
              {/* Image + Bio */}
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src="/me.jpg"
                  alt="Dylan"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
                />
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-bold mb-3 text-cyan-200 drop-shadow-md">
                    Hey, I'm Dylan 👋
                  </h2>
                  <p className="text-sm md:text-base">
                    I’m from Charlotte, North Carolina, and I got into coding in 2021 without really knowing
                    where it would take me. It started with a C++ class at UNC Charlotte where I built a simple
                    version of Mancala in the console. I remember the feeling of getting that first project to run—
                    it just made sense, and I wanted to keep going.
                    <br /><br />
                    I picked up Java soon after, then started learning HTML, CSS, and JavaScript on my own. I was
                    curious how real websites were built, so I tried building my own. That led me to React, then
                    Django, and eventually to full-stack projects where I could bring ideas to life from start to finish.
                    <br /><br />
                    Since then, I’ve built Android apps, Discord bots, SaaS platforms, and even a few 3D interactive
                    interfaces. Every project has taught me something new, and I’ve learned how to design apps that
                    not only work well, but feel good to use. Right now, I’m focused on building clean, scalable tools
                    that solve real problems—and getting a little better with each line of code.
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center text-cyan-200 drop-shadow-md">
                  🧰 Tech Stack
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
                  {technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center text-white hover:scale-110 transition-transform"
                    >
                      {tech.icon}
                      <span className="text-sm mt-1 text-cyan-100 drop-shadow-sm">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default About;
