import { useTheme } from "next-themes";

// import TopSellingFood from "./Top-selling-food/TopSellingFood";
// import MealsCategory from "../../MealsCategory/MealsCategory";
// import Ingredients from "../../SearchByLetter/SearchByLeter";
import React from "react";
import Banner from "../features/Banner";
import TopSellingFood from "../features/TopSellingFood";

const HomeLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-[#ffffff]" : "bg-[black]"}`}>
        <title>RestOs || Home</title>
      <Banner/>
      <div className="">
        <TopSellingFood/>
      </div>
      {/* <Ingredients></Ingredients>
      <MealsCategory></MealsCategory> */}
    </div>
  );
};

export default HomeLayout;
