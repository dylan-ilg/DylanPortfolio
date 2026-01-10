
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaGithub, FaRegFileAlt, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";

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
    tech: ["React Native", "OpenAI Realtime API", "Firebase"],
  },
  {
    title: "ThreeJs 3D Portfolio",
    img: "/PortfolioSnippit.png",
    repo: "https://github.com/dylan-ilg/DylanPortfolio",
    tech: ["React", "three.js", "react-three-fiber", "Tailwind"],
  },
  {
    title: "Network-Wide Ad Blocker",
    img: "/pihole.jpg",
    tech: ["Pi-hole", "Raspberry Pi", "DNS"],
    imageZoom: "in",
    description: `I deployed a Pi-hole on a Raspberry Pi Zero and accomplished network-wide ad blocking that resulted in a cleaner, faster browsing experience across all devices in my home network. This project taught me about DNS-level filtering and how ad blockers work at the network layer rather than just at the browser level.

One of the biggest challenges was configuring the DNS settings correctly and ensuring all devices on the network used the Pi-hole as their primary DNS server. I had to dive deep into router configurations, which gave me valuable insight into home networking fundamentals. The Raspberry Pi Zero's limited resources also meant I needed to optimize the setup to ensure it could handle all DNS requests without becoming a bottleneck.

What I found particularly fascinating was seeing real-time statistics of blocked requests and understanding just how many tracking and advertising domains modern websites contact. The project has been running 24/7 for months, blocking millions of requests and significantly improving page load times. It's been incredibly rewarding to have a tangible infrastructure project that benefits my entire household while deepening my understanding of networking and DNS protocols.`,
  },
  {
    title: "Linux Workstation",
    img: "/workstation.jpg",
    tech: ["Arch Linux", "Custom Build"],
    imageZoom: "out",
    description: `I built a custom Linux workstation from scratch and accomplished a fully optimized development environment that resulted in significantly improved performance for my software development and systems programming work. This project was my first experience with Arch Linux, which taught me an incredible amount about Linux system architecture, package management, and the Unix philosophy of building systems from minimal components.

The build process was challenging in multiple ways. Even though I was familiar with Linux through VMs, this was my first time using an Arch-based distribution like Omarchy as my main workstation. That meant I had to dive deep into understanding the bootloader, the window manager, and how the entire system worked under the hood to get it exactly how I wanted. While I didn't install Arch from the ground up, customizing Omarchy to fit my needs still required a lot of fine-tuning and troubleshooting. Each obstacle gave me a deeper understanding of Linux systems and made the final environment perfectly tailored to my workflow.

What makes this workstation special is that every aspect of it is intentional and optimized for my workflow. I configured a minimal window manager, customized my development environment with vim/neovim, and set up efficient build tools. The experience of building both the hardware and software from first principles gave me confidence in system administration and a deep appreciation for the flexibility and power of Linux. This machine has become my primary development environment and continues to teach me about systems programming and OS internals.`,
  },
  {
    title: "NAS Server",
    img: "/nas.jpg",
    tech: ["TrueNAS", "ZFS"],
    imageZoom: "out",
    description: `I built multiple custom NAS servers running TrueNAS—one for my own home and another for my parents—so that our data truly belongs to us. Instead of relying on the cloud, I wanted full control over where everything is stored and managed. This whole homelab project introduced me to the world of ZFS and taught me all about vdevs, pools, datasets, and how to ensure data integrity and security.

I've set up these NAS systems to handle our media streaming, run Plex, host Minecraft servers, and store all our important documents, photos, and video editing projects. It's become a critical piece of my home infrastructure and a big part of my journey into homelabbing. Maintaining these systems and learning about SMB, NFS, and proper backup strategies has been incredibly rewarding, and I'm excited to explore even more capabilities down the line—maybe even dipping into blockchain projects.`,
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

const DescriptionModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative bg-cyan-900/90 border-2 border-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto backdrop-blur-md shadow-2xl"
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-cyan-200 hover:text-white transition text-2xl font-bold"
        aria-label="Close modal"
      >
        ×
      </button>
      <h2 className="text-2xl font-bold text-cyan-100 mb-4">{project.title}</h2>
      <div className="text-cyan-200 whitespace-pre-line leading-relaxed">
        {project.description}
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.projects, 0.5);
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
                      <h3 className="text-base md:text-lg font-semibold mb-2 text-cyan-100 drop-shadow min-h-[56px] flex items-center">
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

                    <div className="relative overflow-hidden bg-slate-900/50">
                      <img
                        src={p.img}
                        alt={p.title}
                        className={`h-40 w-full transition-transform ${
                          p.imageZoom === "in"
                            ? "object-cover scale-150"
                            : p.imageZoom === "out"
                            ? "object-contain"
                            : "object-cover"
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-px bg-white/60" />
                    </div>

                    <div className="p-4 min-h-[60px]">
                      <div className="flex justify-end items-center gap-2">
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
                        {p.description && (
                          <button
                            onClick={() => setSelectedProject(p)}
                            className="
                              inline-flex items-center gap-1 px-3 py-1 rounded-full
                              border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50
                              transition text-sm
                            "
                            aria-label={`View ${p.title} description`}
                          >
                            <FaInfoCircle className="h-4 w-4" />
                            Info
                          </button>
                        )}
                        {p.website && (
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${p.title} website`}
                            className="inline-flex items-center justify-center rounded-full
                                       border border-white/70 bg-white/10 p-2 hover:bg-white/20 transition"
                          >
                            <FaExternalLinkAlt className="h-5 w-5" />
                          </a>
                        )}
                        {p.repo && (
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
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <DescriptionModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
