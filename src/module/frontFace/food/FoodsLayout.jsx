import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

import {
  SearchBar,
  FoodGrid,
  Pagination,
  FloodingReview,
  FoodPageSpinner,
} from "./data/index";
import { useGetAllFoodsQuery } from "../../../redux/features/food/food.api";

const FoodsLayout = () => {
  // const { data: count } = useGetData({
  //   endpoint: "total-food-count",
  //   key: ["items-count"],
  // });

  const { theme } = useTheme();
  const themeColor = theme === "dark" ? "dark-bg" : "";

  const { data: foodData, isLoading } = useGetAllFoodsQuery(undefined);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [activePage, setActivePage] = useState(0);
  const [searchResult, setSearchResult] = useState([] || [...foodData?.data]);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  useEffect(() => {
    if (foodData?.data) {
      setSearchResult(foodData.data);
    }
  }, [foodData?.data]);

  if (isLoading) return <FoodPageSpinner />;

  return (
    <div className={`pb-9 ${themeColor} bg-[#f6f6f6]`}>
      <div
        className={`min-h-[70vh] flex justify-center relative items-center ${
          theme === "dark" ? "bg-dark-food" : "bg-light-food"
        }`}
      >
        <SearchBar
          isFieldEmpty={isFieldEmpty}
          theme={theme}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          foodData={foodData?.data}
          setIsFieldEmpty={setIsFieldEmpty}
        />
        <FloodingReview />
      </div>
      <div
        className={`text-center mb-5 py-9 ${
          theme === "dark" ? "text-[white]" : ""
        }`}
      >
        <p className="text-primaryColor font-normal italic">RestOS</p>
        <h2 className="text-3xl mt-6 font-bold">MOST POPULAR ITEMS</h2>
      </div>
      <FoodGrid searchResult={searchResult} isFieldEmpty={isFieldEmpty} />
      <Pagination
        count={10}
        itemsPerPage={itemsPerPage}
        activePage={activePage}
        setActivePage={setActivePage}
        setItemsPerPage={setItemsPerPage}
        isFieldEmpty={isFieldEmpty}
      />
    </div>
  );
};

export default FoodsLayout;
