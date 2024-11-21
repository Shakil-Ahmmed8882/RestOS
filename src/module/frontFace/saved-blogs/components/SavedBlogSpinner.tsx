import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

const SavedBlogSpinner = () => {
  return (
    <motion.div
      className="flex justify-center pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Spinner color="default" />
    </motion.div>
  );
};

export default SavedBlogSpinner;
