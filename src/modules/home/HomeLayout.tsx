import { HeroSection } from "@/modules/home/sections/HeroSection";
import { PromoSection } from "@/modules/home/sections/PromoSection";
import { TopCategoriesSection } from "@/modules/home/sections/TopCategoriesSection";
import { PopularDishesSection } from "@/modules/home/sections/PopularDishesSection";
import { WhyRestOSSection } from "@/modules/home/sections/WhyRestOSSection";
import { TestimonialsSection } from "@/modules/home/sections/TestimonialsSection";

export function HomeLayout() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <TopCategoriesSection />
      <PopularDishesSection />
      <WhyRestOSSection />
      <TestimonialsSection />
    </>
  );
}
