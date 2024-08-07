import { useTheme } from "next-themes";

import React from "react";
import Banner from "../features/Banner";
import TopSellingFood from "../features/TopSellingFood";
import MealsCategory from "../features/MealsCategory";


const HomeLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-[#ffffff]" : "bg-[black]"}`}>
        <title>RestOs || Home</title>
      <Banner/>
      
        {/* <TopSellingFood/> */}
      <MealsCategory></MealsCategory>
    </div>
  );
};

export default HomeLayout;
