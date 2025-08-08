// src/Pages/Projects.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "HICE – Education Tool (Full‑Stack)",
    img: "https://picsum.photos/seed/hice/600/360",
    repo: "https://github.com/your-username/hice-edu",
  },
  {
    title: "Power Picks – Discord Bot (Java)",
    img: "https://picsum.photos/seed/powerpicks/600/360",
    repo: "https://github.com/your-username/power-picks-bot",
  },
  {
    title: "SaaS Starter (Django + React)",
    img: "https://picsum.photos/seed/saas/600/360",
    repo: "https://github.com/your-username/saas-starter",
  },
  {
    title: "Portfolio 3D (R3F + GLSL)",
    img: "https://picsum.photos/seed/portfolio3d/600/360",
    repo: "https://github.com/your-username/portfolio-3d",
  },
  {
    title: "Android Fitness Tracker",
    img: "https://picsum.photos/seed/fitness/600/360",
    repo: "https://github.com/your-username/android-fitness",
  },
  {
    title: "REST API Boilerplate (DRF)",
    img: "https://picsum.photos/seed/drf/600/360",
    repo: "https://github.com/your-username/drf-boilerplate",
  },
];

const Projects = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.projects, 0.5);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isVisible) setExpanded(true);
  }, [isVisible]);

  const toggleCard = () => setExpanded((prev) => !prev);

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 z-40 text-center pointer-events-auto w-full max-w-5xl px-4"
      >
        {/* Floating toggle button */}
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-cyan-100 font-semibold text-lg rounded-full border border-white hover:bg-opacity-30 transition"
          onClick={toggleCard}
        >
          {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          Projects
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              key="projects-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 bg-purple-400/80 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-white overflow-hidden"
            >
              {/* Scrollable area */}
              <div
                className="overflow-y-auto p-6 scroll-area"
                style={{ maxHeight: "400px" }}
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Grid 2 rows x 3 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((p, idx) => (
                    <motion.article
                      key={p.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      className="group rounded-xl overflow-hidden border border-white/70 bg-white/10 backdrop-blur-lg shadow-lg"
                    >
                      {/* Top image */}
                      <div className="relative">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                        {/* Subtle outline separating top/bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-white/60" />
                      </div>

                      {/* Bottom area: caption + GitHub icon */}
                      <div className="relative p-4">
                        <h3 className="text-sm md:text-base font-semibold pr-10 text-cyan-50">
                          {p.title}
                        </h3>

                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${p.title} on GitHub`}
                          className="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 p-2 hover:bg-white/20 transition"
                        >
                          <FaGithub className="h-5 w-5" />
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  );
};

export default Projects;
