




import React from "react";

const SearchBar = ({ theme, searchResult, setSearchResult, foodData, isFieldEmpty, setIsFieldEmpty, setSearchTerm }) => {
  const handleSearchFood = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setIsFieldEmpty(searchTerm === "");
    setSearchTerm(e.target.value)

    const foundFoods = foodData.filter((food) =>
      food.foodName.toLowerCase().includes(searchTerm)
    );
    setSearchResult(foundFoods);
  };

  return (
    <div className="relative w-[90%] md:w-[400px]">
      <input
        onChange={handleSearchFood}
        type="text"
        placeholder="Search by food name"
        className={`input w-full placeholder:text-[#5a5a5a] focus-within:outline-none  ${
          theme === "dark"
            ? "bg-[#20acd357] text-[white]"
            : "bg-[#ffffff75] text-[black]"
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