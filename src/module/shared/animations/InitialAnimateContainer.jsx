// @ts-nocheck
import { motion } from "framer-motion";

const InitialAnimateContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x:32 }}
      animate={{ opacity: 1, x:0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default InitialAnimateContainer;
