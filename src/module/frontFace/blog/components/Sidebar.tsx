
import React, { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../../assets/icons/Icons";
import { blogCategories } from "../blog.constants";
import { Input } from "@nextui-org/react";
import { getCategoryFromUrl } from "../layout/BlogLayout";

function Sidebar({ onSearch}) {
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  const handleDropdownCategory = (category: string) => {
    const reshapedCategory = category.split(" ").join("+");
    navigate(`/blog?category=${reshapedCategory}`);
  };

  const handleClearFilters = () => {
    onSearch(""); // Clear search term
    navigate("/blog"); // Reset URL to base blog path
  };

  return (
    <div className="sticky top-4 space-y-4">
      {/* Searchbar */}
      <div
        className={`${
          focus ? "shadow-sm" : "shadow-none"
        } flex items-center  px-3 bg-[#fff] rounded-lg`}
      >
        <article></article>
        <Input
          startContent={<SearchIcon />}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="focu my-2 bg-transparent focus-within:!border-none focus-within:!outline-none border-none"
          placeholder="Search here..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div
        className={`${
          focus ? "visible h-full" : "h-0 md:h-full  invisible md:visible"
        } rounded-lg shadow-sm transition-all duration-500`}
      >
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-2 pl-4">Categories</h3>
          {/* Clear Filters Button */}
          <button
            className="text-red-500 hover:translate-x-1 transition-all duration-300 hover:text-red-700 p-2"
            onClick={handleClearFilters}
          >
            <IoRefresh className="text-2xl mr-3"/>
          </button>
        </div>
        <div>
          {blogCategories.map((category) => (
            <div
              key={category}
              className={`${getCategoryFromUrl() === category?' border-l-2 border-primaryColor border-0 text-primaryColor':"border-transparent"}  block cursor-pointer hover:bg-[#f6fff7] hover:text-primaryColor p-4 transition500 text-sm font-medium text-muted-foreground  `}
              onClick={() => handleDropdownCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
