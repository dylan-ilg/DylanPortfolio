import React from "react";
import { motion } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";

const Projects = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.projects, 0.5);

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 z-40 px-4 text-white text-center"
      >
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-2 max-w-lg">
          Take a look at some of my featured projects, from React apps to Android builds and backend APIs.
        </p>
      </motion.div>
    )
  );
};

export default Projects;
