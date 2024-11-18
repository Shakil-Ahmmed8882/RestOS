import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const MotionWrapper = ({ className = "", children }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className} py-12`} 
    >
      {children} 
    </motion.div>
  );
};

export default MotionWrapper;
