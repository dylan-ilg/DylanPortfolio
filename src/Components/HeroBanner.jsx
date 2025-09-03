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
        className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center z-40 p-8 pointer-events-none"
      >
        <a
          href="/DylanIlg.pdf"
          download
          className="mt-6 mb-6 px-6 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-colors pointer-events-auto inline-block"
        >
          Open for Work – Download my CV
        </a>

        <img
          src="/title1.png"
          alt="Dylan Ilg Star Wars Logo"
          className="w-[280px] sm:w-[360px] mx-auto"
        />



      </motion.div>
    )
  );
};

export default HeroBanner;
