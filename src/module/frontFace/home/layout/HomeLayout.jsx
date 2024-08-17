import { useTheme } from "next-themes";


import React from "react";
import Banner from "../features/Banner";
import TopSellingFood from "../features/TopSellingFood";
import MealsCategory from "../features/MealsCategory";
import ConfirmModal from "../../../../shared/modals/ConfirmModal";
import { showErrorModal, showInfoModal } from "../../../../shared/modals";
import RSDropdown from "../../../../shared/ui/RSDropdown";
import Feature from "../features/Feature";
import WhyRestOS from "../features/WhyRestOS";
import TopCategories from "../features/topCategories/TopCategories";
import Container from "../../../../shared/layouts/Container";
import PopularDishes from "../features/popularDishes/PopularDishes";
import SpecialDinnerMenus from "../features/specialDinnerMenu/SpecialDinnerMenus";


const HomeLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-[#ffffff]" : "bg-[black]"}`}>
    <Container>
        <title>RestOs || Home</title>
      <Banner/>
    </Container>
      <SpecialDinnerMenus/>
      <PopularDishes/>
      <TopCategories/>
      <WhyRestOS/>
      <Feature/>
        {/* <TopSellingFood/> */}
      {/* <MealsCategory></MealsCategory> */}
    </div>

  );
};

export default HomeLayout;
