import React from "react";
import TopCategories from "./src/module/frontFace/home/features/topCategories/TopCategories";
import MealsCategory from "./src/module/frontFace/home/features/MealsCategory";
import HeroSectionPageLayout from "./src/module/frontFace/home/components/hero/HeroSectionPageLayout"
import Testimonial from "./src/module/frontFace/home/features/testimonials/Testimonials";
const X = () => {
  return (
    <section>
      <TopCategories/>
      <MealsCategory/>
      <HeroSectionPageLayout/>
      <Testimonial/>
      
    </section>
  );
};

export default X;