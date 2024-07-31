

import React from "react";

const SearchBar = ({ theme, searchResult, setSearchResult, foodData, isFieldEmpty, setIsFieldEmpty }) => {
  const handleSearchFood = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setIsFieldEmpty(searchTerm === "");

    const foundFoods = foodData.filter((food) =>
      food.foodName.toLowerCase().includes(searchTerm)
    );
    setSearchResult(foundFoods);
  };

  return (
    <div className="relative md:w-[300px]">
      <input
        onChange={handleSearchFood}
        type="text"
        placeholder="Search by food name"
        className={`input w-full focus-within:outline-none max-w-xs ${
          theme === "dark"
            ? "bg-[#20acd377] text-[white]"
            : "bg-[#ffffffae] text-[black]"
        }`}
      />
      <div
        className={`badge outline-none border-none absolute -right-1 -top-2 ${
          searchResult.length > 0 && !isFieldEmpty ? "text-[white] bg-deepPink" : ""
        }`}
      >
        {searchResult.length > 0 && !isFieldEmpty ? searchResult.length : "0"}
      </div>
    </div>
  );
};

export default SearchBar;