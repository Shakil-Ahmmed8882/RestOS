import React from "react";
import { motion } from "framer-motion";

interface FoodFiltersProps {
  handleCategoryChange: (category: string) => void;
  selectedRange: string;
  setSelectedRange: (range: string) => void;
  dark: boolean;
}

const FoodFilters: React.FC<FoodFiltersProps> = ({
  handleCategoryChange,
  selectedRange,
  setSelectedRange,
  dark,
}) => {
  const categories = ["All", "Indian", "Italian", "Chinese", "Mexican", "Thai"];
  const priceRanges = [
    { value: "0-25", label: "$0 - $25" },
    { value: "25-50", label: "$25 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-500", label: "$100+" },
  ];

  return (
    <div className="space-y-6">
      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
          dark ? "text-gray-300" : "text-gray-900"
        }`}>
          Cuisines
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ x: 4 }}
              onClick={() => handleCategoryChange(cat)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all font-medium text-sm ${
                dark
                  ? "hover:bg-emerald-900/30 text-gray-300 hover:text-emerald-400"
                  : "hover:bg-emerald-100 text-gray-700 hover:text-emerald-600"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className={`${dark ? "bg-gray-800/50" : "bg-gray-100"} h-px`}></div>

      {/* Price Range */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${
          dark ? "text-gray-300" : "text-gray-900"
        }`}>
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <motion.button
              key={range.value}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedRange(range.value)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all font-medium text-sm flex items-center ${
                selectedRange === range.value
                  ? dark
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-500 text-white"
                  : dark
                  ? "hover:bg-gray-800/50 text-gray-300"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 mr-2 flex-shrink-0 ${
                  selectedRange === range.value
                    ? `${dark ? "bg-white border-white" : "bg-white border-white"}`
                    : `${dark ? "border-gray-500" : "border-gray-300"}`
                }`}
              ></span>
              {range.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FoodFilters;
