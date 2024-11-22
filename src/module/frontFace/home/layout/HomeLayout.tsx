

import React from "react";
import Banner from "../features/Banner";
import WhyRestOS from "../features/WhyRestOS";
import Container from "../../../../shared/layouts/Container";
import PopularDishes from "../features/popularDishes/PopularDishes";
import SpecialDinnerMenus from "../features/specialDinnerMenu/SpecialDinnerMenus";
import Testimonial from "../features/testimonials/Testimonials";
import PromoSection from "../components/promo-section/PromoSection";

const HomeLayout = () => {


  return (
    <div>
      <Container>
        <title>RestOs || Home</title>
        <Banner />
      </Container>
      <PromoSection />
      <SpecialDinnerMenus />
      <PopularDishes />
      <WhyRestOS />
      <Testimonial />
    </div>
  );
};

export default HomeLayout;
