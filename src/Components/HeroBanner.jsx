import React from "react";
import { motion } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";

const HeroBanner = () => {
  const { isAtHomeView } = useSceneRotation();

  return (
    isAtHomeView && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center z-40 px-4 pointer-events-none backdrop-blur-md bg-white/10 rounded-lg"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
          Dylan Ilg
        </h1>
        <p className="text-lg sm:text-xl text-white mt-2 drop-shadow-sm">
          Charlotte-Based FullStack Developer
        </p>
        <button
          className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-colors pointer-events-auto"
          onClick={() => window.open('/resume.pdf', '_blank')}
        >
          💼 Open for Work – Download my CV
        </button>
      </motion.div>
    )
  );
};

export default HeroBanner;
