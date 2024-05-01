// src/components/AnimatedPage.js
import React from "react";
import { motion, easeInOut } from "framer-motion";

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: easeInOut }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
