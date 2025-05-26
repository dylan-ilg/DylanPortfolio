import React from "react";
import { motion } from "framer-motion";
import { useSceneRotation } from "../helpers/SceneRotation";
import { isInViewRange, NAV_ROTATIONS } from "../helpers/RotationHelper";

const Contact = () => {
  const { rotationY } = useSceneRotation();
  const isVisible = isInViewRange(rotationY, NAV_ROTATIONS.contact, 0.5);

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 z-40 px-4 text-white text-center"
      >
        <h2 className="text-3xl font-bold">Let’s Connect</h2>
        <p className="mt-2 max-w-lg">
          Want to collaborate or have a question? Reach out and let’s build something awesome together.
        </p>
      </motion.div>
    )
  );
};

export default Contact;
