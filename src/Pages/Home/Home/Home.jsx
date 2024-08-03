import { useTheme } from "next-themes";
import Banner from "./Banner";
import TopSellingFood from "./Top-selling-food/TopSellingFood";
import MealsCategory from "../../MealsCategory/MealsCategory";
import Ingredients from "../../SearchByLetter/SearchByLeter";
import React from "react";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-[#ffffff]" : "bg-[black]"}`}>
        <title>RestOs || Home</title>
      <Banner/>
      {/* <div className="">
        <TopSellingFood></TopSellingFood>
      </div>
      <Ingredients></Ingredients>
      <MealsCategory></MealsCategory> */}
    </div>
  );
};

export default Home;
