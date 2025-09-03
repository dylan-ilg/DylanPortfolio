import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.contact, 0.5);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleCard = () => setExpanded((prev) => !prev);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dylan.scott.ilg@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
        Contact
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="contact-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            // Projects-style panel colors
            className="mt-6 bg-cyan-900/40 border-2 border-white rounded-xl backdrop-blur-md shadow-xl text-cyan-200 overflow-hidden"
          >
            <div
              className="overflow-y-auto p-6 scroll-area"
              style={{ maxHeight: "400px" }}
              onWheel={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-cyan-100 drop-shadow">
                Let’s Connect
              </h2>
              <p className="mb-6 max-w-3xl mx-auto">
                Whether you’re hiring for a role, seeking a collaborator, or just want to chat about tech — I’d
                love to connect and see how I can add value to your team.
              </p>

              <div className="flex flex-col items-center gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/dylan-ilg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50 transition"
                >
                  <FaLinkedin size={20} />
                  <span className="text-sm text-cyan-100">LinkedIn</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/dylan.ilg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50 transition"
                >
                  <FaInstagram size={20} />
                  <span className="text-sm text-cyan-100">Instagram</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/dylan-ilg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50 transition"
                >
                  <FaGithub size={20} />
                  <span className="text-sm text-cyan-100">GitHub</span>
                </a>

                {/* Email (copy to clipboard) */}
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/70 bg-cyan-900/30 hover:bg-cyan-900/50 transition"
                >
                  <MdEmail size={20} />
                  <span className="text-sm text-cyan-100">
                    dylan.scott.ilg@gmail.com {copied && "(Copied!)"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact;
