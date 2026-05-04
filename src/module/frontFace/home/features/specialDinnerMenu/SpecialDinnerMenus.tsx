import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import burgers from "../../../../../assets/img/home/top-categories/Burgers.png";
import lemonade from "../../../../../assets/img/home/section3/lemonade.png";
import drink2 from "../../../../../assets/img/home/section3/drink2.png";
import pizza from "../../../../../assets/img/home/section3/pizza.png";
import chicken from "../../../../../assets/img/home/section3/chicken.png";
import soup from "../../../../../assets/img/home/section3/soup.png";
import sweet from "../../../../../assets/img/home/section3/sweet.png";
import wine from "../../../../../assets/img/home/section3/wine.png";
import Container from "../../../../../shared/layouts/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  { name: "Soup", description: "Warm and hearty soup with rich, layered flavors that comfort the soul.", image: soup, price: "$8.99" },
  { name: "Drink Mix", description: "A delightful blend of fruity and fizzy drinks to refresh your senses.", image: "https://i.pinimg.com/236x/e1/0d/b1/e10db1ba1627730a89d327ec5960ae55.jpg", price: "$5.99" },
  { name: "Pizza", description: "Classic cheesy pizza with hand-stretched dough and delicious toppings.", image: pizza, price: "$14.99" },
  { name: "Lemonade", description: "Freshly squeezed citrus drink to quench your thirst on any day.", image: lemonade, price: "$4.99" },
  { name: "Fried Chicken", description: "Crispy golden chicken pieces with our signature seasoning blend.", image: chicken, price: "$12.99" },
  { name: "Sweet Desserts", description: "An assortment of sweet treats crafted to satisfy every craving.", image: sweet, price: "$7.99" },
  { name: "Fine Wine", description: "Curated fine wines to perfectly complement your dining experience.", image: wine, price: "$18.99" },
  { name: "Burgers", description: "Juicy smash burgers stacked with fresh lettuce, tomato, and sauce.", image: burgers, price: "$11.99" },
  { name: "Tropical Mix", description: "Exotic drink blend packed with island-fresh tropical fruits.", image: drink2, price: "$6.99" },
];

const SpecialDinnerMenus = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [selected, setSelected] = useState(dishes[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dinner-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: ".dinner-heading", start: "top 88%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-16 ${dark ? "bg-gray-950" : "bg-white"}`}
    >
      <Container>
        <div className="dinner-heading mb-10 space-y-2">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
            🍽️ Featured
          </span>
          <h2 className={`text-3xl font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
            Special Dinner Menus
          </h2>
        </div>

        <div className="md:flex gap-8 overflow-hidden">
          {/* Main display */}
          <div className="w-full md:flex relative min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={selected.name}
                src={selected.image}
                alt={selected.name}
                className="mx-auto sm:w-[50%] md:w-[65%] md:h-full pb-4 md:absolute -bottom-8 -left-4 drop-shadow-2xl object-contain"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </AnimatePresence>

            <div className="mt-6 ml-auto md:w-[45%] relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${selected.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  <h3 className={`text-2xl md:text-3xl font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
                    {selected.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>
                    {selected.description}
                  </p>
                  <p className="text-2xl font-bold text-emerald-500">{selected.price}</p>
                  <Link
                    to="/food"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-200"
                  >
                    Order Now →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dish selector */}
          <div className="md:w-[280px] flex flex-col justify-center">
            <div
              className={`rounded-2xl shadow-sm overflow-y-auto max-h-[420px] py-4 px-3 space-y-1 scrollbar-hide ${
                dark ? "bg-gray-900 border border-gray-800" : "bg-gray-50 border border-gray-100"
              }`}
            >
              {dishes.map((dish) => (
                <button
                  key={dish.name}
                  onClick={() => setSelected(dish)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    selected.name === dish.name
                      ? dark
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white shadow-sm border border-gray-100"
                      : dark
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-white/80"
                  }`}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-12 h-12 rounded-full object-cover shadow"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{dish.name}</p>
                    <p className="text-xs text-emerald-500 font-medium">{dish.price}</p>
                  </div>
                  {selected.name === dish.name && (
                    <span className="ml-auto text-emerald-500 text-xs">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpecialDinnerMenus;
