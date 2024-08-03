import React from "react";
import Card from "../../Components/Shared/Card/Card";

const FoodGrid = ({ searchResult, isFieldEmpty }) => {
  return (
    <div
      className={`${
        isFieldEmpty ? "responsive-grid" : "responsive-grid-search"
      } max-w-7xl mx-auto md:px-11 gap-10`}
    >
      {searchResult.length > 0 &&
        searchResult.map((food) => <Card key={food._id} food={food} />)}
    </div>
  );
};

export default FoodGrid;
