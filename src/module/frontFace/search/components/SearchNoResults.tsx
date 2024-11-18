import React from "react";
import { motion } from "framer-motion";

const SearchNoResults: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-center h-64 text-center text-gray-500 text-xl">
      No results found. Try a different search term.
    </motion.div>
  );
};

export default SearchNoResults;
