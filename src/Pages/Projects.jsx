import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGithub, FaRegFileAlt } from "react-icons/fa";

const projects = [
  {
    title: "EDUKona ",
    img: "/edukona.png",
    website: "https://edukona.com/",
    paper: "https://www.computer.org/csdl/proceedings-article/fie/2024/10892814/24EnhDJDV6M", // added paper link
    repo: "https://github.com/uncc-hice/edukona_frontend?tab=readme-ov-file",
    tech: ["React", "Django", "MUI", "Python", "Javascript", "PostgreSQL"],
  },
  {
    title: "GymGPT",
    img: "/ChatGPT.jpg",
    website: "https://gym-gpt.framer.website/",
    tech: ["Next.js", "OpenAI API", "PostgreSQL", "tailwind"],
  },
  {
    title: "ThreeJs 3D Portfolio",
    img: "/PortfolioSnippit.png",
    repo: "https://github.com/dylan-ilg/DylanPortfolio",
    tech: ["React", "three.js", "react-three-fiber", "Tailwind"],
  },
  {
    title: "Android Google Maps API app",
    img: "/googlemaps.jpg",
    repo: "https://github.com/dylan-ilg/AndriodMapsApp",
    tech: ["Android", "Java", "Google Maps SDK"],
  },
  {
    title: "Power Picks – Discord Bot",
    img: "/discordart.jpg",
    repo: "https://github.com/dylan-ilg/PowerPlayz",
    tech: ["Java", "Maven", "JDA API"],
  },
];

const Chip = ({ children }) => (
  <span
    className="
      inline-flex items-center px-2 py-0.5 rounded-full
      text-[11px] md:text-xs font-medium
      text-cyan-200/95 border border-white/50
      bg-cyan-900/30 backdrop-blur
    "
  >
    {children}
  </span>
);

const Projects = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.projects, 0.5);
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => setExpanded((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`absolute top-32 left-1/2 -translate-x-1/2 z-40 text-center w-full max-w-5xl px-4 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-900/40 text-cyan-200 font-semibold text-lg rounded-full border border-white hover:bg-cyan-900/55 transition"
        onClick={toggleCard}
      >
        {expanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        Projects
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="projects-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="
              mt-6 bg-cyan-900/40 border-2 border-white rounded-xl
              backdrop-blur-md shadow-xl text-cyan-200 overflow-hidden
            "
          >
            <div
              className="overflow-y-auto p-6 scroll-area"
              style={{ maxHeight: "400px" }}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, idx) => (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="
                      group rounded-xl overflow-hidden border border-white/70
                      bg-white/5 backdrop-blur-lg shadow-lg
                      text-cyan-200 flex flex-col
                    "
                  >
                    <header className="p-4 pb-3 text-left">
                      <h3 className="text-base md:text-lg font-semibold mb-2 text-cyan-100 drop-shadow">
                        {p.title}
                      </h3>
                      {p.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <Chip key={t}>{t}</Chip>
                          ))}
                        </div>
                      )}
                    </header>

                    <div className="relative">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-40 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-px bg-white/60" />
                    </div>

                    <div className="flex justify-between items-end p-4 min-h-[72px]">
                      <div className="flex gap-2 flex-wrap">
                        {p.paper && (
                          <a
                            href={p.paper}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              inline-flex items-center gap-1 px-3 py-1 rounded-full
                              border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50
                              transition text-sm
                            "
                            aria-label={`Open ${p.title} paper`}
                          >
                            <FaRegFileAlt className="h-4 w-4" />
                            Paper
                          </a>
                        )}
                      </div>

                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${p.title} on GitHub`}
                        className="inline-flex items-center justify-center rounded-full
                                   border border-white/70 bg-white/10 p-2 hover:bg-white/20 transition"
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
  );
};

export default Projects;
