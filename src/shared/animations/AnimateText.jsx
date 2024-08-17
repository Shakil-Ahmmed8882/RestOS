// src/components/AnimatedText.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ children, className, key }) => {
  return (
    <motion.div
      className={className}
      key={key}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;
