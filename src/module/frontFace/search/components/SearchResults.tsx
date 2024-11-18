import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { SearchResult } from "./data.type";

const RenderSearchResults = ({ results }: { results: SearchResult[] }) => {
  return results.map((result, index) => (
    <motion.div
      key={result.source}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 capitalize text-primaryColor">
        {result.source}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.data.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={`/${
                result.source === `blogs`
                  ? `blog/${item._id}`
                  : `food-details/${item._id}`
              }`}
            >
              <Card>
                <CardFooter className="h-full cursor-pointer">
                  <CardBody className="p-0">
                    <Image
                      src={item.image || item.foodImage || "/placeholder.svg"}
                      alt={item.title || item.foodName || item.name || ""}
                      className="w-full h-48 object-cover"
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-start">
                    <h3 className="text-lg font-semibold text-primaryColor">
                      {item.title || item.foodName || item.name}
                    </h3>
                    <p
                      className={`text-sm mt-2 px-2 py-1 rounded-full ${"bg-gray-100 text-gray-800"}`}
                    >
                      {item.category || item.foodCategory || result.source}
                    </p>
                  </CardFooter>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ));
};

export default RenderSearchResults;
