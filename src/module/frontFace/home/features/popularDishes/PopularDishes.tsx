import React, { useEffect, useRef } from "react";
import { dishes } from "../../data";
import { FillStar, UnFillStar, MarkedFavorite } from "../../../../../assets/icons";
import ScrollSlider from "../../../../../shared/layouts/ScrollSlider";
import Container from "../../../../../shared/layouts/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const PopularDishes = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".popular-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: ".popular-heading", start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderDish = (dish: any) => (
    <div
      className={`group w-[260px] relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border ${
        dark
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-100"
      }`}
    >
      {/* Image background */}
      <div className={`flex items-center justify-center pt-6 pb-2 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
        <img
          className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
          src={dish.image}
          alt={dish.name}
        />
      </div>

      <div className="p-4">
        <h3 className={`font-semibold text-base mb-1 ${dark ? "text-white" : "text-gray-800"}`}>{dish.name}</h3>
        <div className="flex items-center gap-0.5 mb-3">
          <FillStar className="text-emerald-500 w-4 h-4" />
          <FillStar className="text-emerald-500 w-4 h-4" />
          <FillStar className="text-emerald-500 w-4 h-4" />
          <FillStar className="text-emerald-500 w-4 h-4" />
          <UnFillStar className="w-4 h-4" />
          <span className={`text-xs ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>(4.0)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-emerald-500 font-bold text-sm">$12.99</span>
          <button className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
            dark
              ? "bg-emerald-900/50 text-emerald-400 hover:bg-emerald-800/60"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}>
            Add to cart
          </button>
        </div>
      </div>

      {/* Favorite button */}
      <button className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        dark ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50 shadow-sm"
      }`}>
        <MarkedFavorite className="text-orange-400 w-4 h-4" />
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`py-16 ${dark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Container className="hidden md:block">
        <ScrollSlider
          items={dishes}
          renderItem={renderDish}
          maxVisibleItems={5}
          itemWidth={260}
        >
          <div className="popular-heading mb-8 space-y-2">
            <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
              🔥 Trending
            </span>
            <h2 className={`text-3xl font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
              Popular Dishes
            </h2>
          </div>
        </ScrollSlider>
      </Container>
    </section>
  );
};

export default PopularDishes;
