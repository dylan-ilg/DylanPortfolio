import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";

// Icons
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";

const About = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.about, 0.35);

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
    >
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-900/40 text-cyan-200 font-semibold text-lg rounded-full border border-white hover:bg-cyan-900/55 transition"
        onClick={toggleCard}
      >
        {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        About Me
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="about-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            // Projects-style panel colors
            className="mt-6 bg-cyan-900/40 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-cyan-200 overflow-hidden"
          >
            <div
              className="p-6 scroll-area overflow-y-auto md:overflow-visible max-h-[70vh] md:max-h-none"
              style={{ WebkitOverflowScrolling: "touch" }}
              onWheel={(e) => e.stopPropagation()} // protect against trackpad wheel rotating scene
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src="/me.jpg"
                  alt="Dylan"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
                />
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-bold mb-3 text-cyan-100 drop-shadow">
                    Hey, I&apos;m Dylan 👋
                  </h2>

                  <p className="text-sm md:text-base">
                    I’m from Charlotte, North Carolina, and I got into coding in 2021 without really knowing
                    where it would take me. It started with a C++ class at UNC Charlotte where I built a simple
                    version of Mancala in the console. I remember the feeling of getting that first project to run—
                    and I wanted to keep going.
                    <br /><br />
                    I picked up Java soon after, then started learning HTML, CSS, and JavaScript on my own. I was
                    curious how real websites were built, so I tried building my own. That led me to React, then
                    Django, and eventually to full-stack projects where I could bring ideas to life from start to finish.
                    <br /><br />
                    Since then, I’ve built Android apps, Discord bots, SaaS platforms, and even a few 3D interactive
                    interfaces. Every project has taught me something new, and I’ve learned how to design apps that
                    not only work well, but feel good to use. Right now, I’m focused on building clean, scalable tools
                    that solve real problems—and getting a little better with each line of code. At UNC Charlotte, I also
                    helped establish the <span className="font-semibold text-cyan-100">Pi Kappa Alpha</span> chapter as a
                    Founding Father, which sharpened my leadership, teamwork, and community-building skills —{" "}
                    <a
                      href="/Charter.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline decoration-cyan-200/60 hover:decoration-cyan-200 transition"
                      title="Read the Charter (PDF)"
                      aria-label="Read the Charter (PDF)"
                    >
                      you can read all about it here <FaRegFileAlt className="w-4 h-4 inline-block align-middle" />
                    </a>.
                  </p>
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
