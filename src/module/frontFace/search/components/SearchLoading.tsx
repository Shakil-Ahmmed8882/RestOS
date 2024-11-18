import React from "react";
import { motion } from "framer-motion";

const SearchLoading: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primaryColor"></div>
    </motion.div>
  );
};

export default SearchLoading;
