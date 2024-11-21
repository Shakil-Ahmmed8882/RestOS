import { useTheme } from "next-themes";

import React from "react";
import Banner from "../features/Banner";
import WhyRestOS from "../features/WhyRestOS";
import TopCategories from "../features/topCategories/TopCategories";
import Container from "../../../../shared/layouts/Container";
import PopularDishes from "../features/popularDishes/PopularDishes";
import SpecialDinnerMenus from "../features/specialDinnerMenu/SpecialDinnerMenus";
import Testimonial from "../features/testimonials/Testimonials";
import HeroSectionPageLayout from "../components/hero/HeroSectionPageLayout";
import PromoSection from "../components/promo-section/PromoSection";

const HomeLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-[#ffffff]" : "bg-[black]"}`}>
      <Container>
        <title>RestOs || Home</title>
        <Banner />
      </Container>
        {/* <HeroSectionPageLayout/> */}
        <PromoSection/>
      <SpecialDinnerMenus />
      <PopularDishes />
      <TopCategories />
      <WhyRestOS />
      <Testimonial />
      {/* <TopSellingFood/> */}
      {/* <MealsCategory></MealsCategory> */}
    </div>
  );
};

export default HomeLayout;
