import React from "react";
import { motion } from "framer-motion";

const SearchError: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-red-500 text-xl">
      Something went wrong. Please try again.
    </motion.div>
  );
};

export default SearchError;
