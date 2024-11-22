import { useTheme } from "next-themes";

import React from "react";
import Banner from "../features/Banner";
import WhyRestOS from "../features/WhyRestOS";
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
      <PromoSection />
      <SpecialDinnerMenus />
      <PopularDishes />
      <HeroSectionPageLayout />
      <WhyRestOS />
      <Testimonial />
    </div>
  );
};

export default HomeLayout;
