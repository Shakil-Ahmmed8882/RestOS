import React, { useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { SearchIcon } from "../../../../assets/icons/Icons";

function Sidebar({ onSearch, onSelectCategory, categories }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="sticky top-4 space-y-4">

      {/* Searchbar */}
      <div
        className={`${
          focus ? "shadow-sm" : "shadow-none"
        } flex items-center  px-3 bg-[#fff] rounded-lg`}
      >
        <article>
          <SearchIcon />
        </article>
        <input
          //
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className=" focu my-2 focus-within:!border-none focus-within:!outline-none border-none p-2 px-2 md:px-4"
          placeholder="Search here..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div
        className={` ${
          focus ? "visible h-full" : "h-0 md:h-full  invisible md:visible"
        } rounded-lg shadow-sm  transition-all duration-500`}
      >
        <h3 className="text-lg font-semibold mb-2 pl-4">Categories</h3>
        <div>
          {["Italian", "Vegan", "Dessert", "Appetizers", "Beverages"].map(
            (category) => (
              <Link
                key={category}
                className="block hover:bg-[#eeeeee] p-4   transition500  text-sm font-medium text-muted-foreground hover:text-foreground"
                to="#"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
