import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";

const About = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.about, 0.5);
  const [expanded, setExpanded] = useState(false);

  const toggleCard = () => setExpanded((prev) => !prev);

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 z-40 text-center pointer-events-auto"
      >
        <div className="bg-sky-300 bg-opacity-70 border-2 border-white rounded-lg p-6 max-w-lg mx-auto backdrop-blur-md shadow-lg">
          <button
            className="text-white font-semibold text-lg underline hover:text-amber-200 transition"
            onClick={toggleCard}
          >
            {expanded ? "Hide Info" : "Learn More"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-white border-t border-white pt-4 text-sm leading-relaxed"
              >
                <h2 className="text-xl font-bold mb-2">About Me</h2>
                <p>
                  I'm Dylan — a full-stack developer with a passion for crafting immersive 3D web experiences,
                  building scalable backend systems, and shipping clean, modular code.
                  From React and Tailwind to Firebase and APIs, I bring ideas to life.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  );
};

export default About;
