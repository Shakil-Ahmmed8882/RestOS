// src/components/GlobalSearch/SearchResults.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";

type SearchResult = {
  source: string;
  data: SearchItem[];
};

type SearchItem = {
  _id: string;
  title?: string;
  foodName?: string;
  name?: string;
  category?: string;
  foodCategory?: string;
  image?: string;
  foodImage?: string;
};

const renderSearchResults = (results: SearchResult[], handleClose) => {
  return results.map((result, index) => (
    <div key={index} className="mb-4">
      <h3 className="text-xl text-light-gray italic font-semibold capitalize mb-2">
        {result.source}
      </h3>
      <ul className="space-y-6 mt-6">
        {result.data.map((item) => (
          <li
            onClick={handleClose}
            key={item._id}
            className="flex items-center hover:bg-[#f3f3f3] p-3 cursor-pointer  space-x-2"
          >
            <Link
              to={`/${
                result.source === "blogs"
                  ? `blog/${item._id}`
                  : `food/${item._id}`
              }`}
              className="flex items-center gap-3"
            >
              {item.image || item.foodImage ? (
                <Image
                  src={item.image || item.foodImage}
                  alt={item.title || item.foodName || item.name || ""}
                  className="w-20 h-20 object-cover rounded"
                />
              ) : null}
              <div>
                <p className="font-medium pb-2">
                  {item.title || item.foodName || item.name}
                </p>
                <p className="text-sm text-[gray]">
                  {item.category || item.foodCategory}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
};

const SearchResults = ({
  results,
  handleClose,
}: {
  results: SearchResult[];
  handleClose: () => void;
}) => (
  <div className="grid grid-cols-3">
    {renderSearchResults(results, handleClose)}
  </div>
);

export default SearchResults;
