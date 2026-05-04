import React, { useEffect, useRef } from "react";
import chickenImage from "../../../../assets/img/home/chicken.png";
import discountImage from "../../../../assets/img/home/discount.png";
import { motion } from "framer-motion";
import FoodSlide from "../components/banner/components/FoodSlide";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Banner() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`px-4 md:px-0 py-16 overflow-hidden ${dark ? "bg-gray-950" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              🍽️ Premium Dining Experience
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className={`text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Extraordinary</span> Flavors
            </motion.h1>

            <motion.p variants={fadeUp} className={`text-lg leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
              Fresh ingredients, bold recipes, delivered fast. RestOS brings the restaurant experience right to your door.
            </motion.p>

            <motion.div variants={fadeUp} className={`flex items-center gap-2 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
              <span className="text-base">🕒</span>
              Average delivery in under 30 minutes
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-7 py-3 rounded-full font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200"
              >
                Explore Menu →
              </Link>
              <Link
                to="/food"
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm border transition-all duration-200 hover:scale-105 ${
                  dark
                    ? "border-gray-700 text-gray-300 hover:border-emerald-500 hover:text-emerald-400"
                    : "border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                View All Foods
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8 pt-2">
              {[
                { value: "200+", label: "Menu Items" },
                { value: "50k+", label: "Happy Customers" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className={`text-2xl font-bold ${dark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — parallax image */}
          <div className="relative flex-1 flex justify-center">
            {/* Glow circle behind */}
            <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/10 blur-3xl" />

            <img
              ref={imgRef}
              className="relative z-10 w-full sm:w-[70%] md:w-[60%] lg:w-auto mx-auto drop-shadow-2xl will-change-transform"
              src={chickenImage}
              alt="Chicken Dish"
            />

            {/* Discount badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`absolute left-6 md:left-8 lg:left-4 top-8 z-20 shadow-xl rounded-2xl p-4 hidden sm:block w-[180px] ${
                dark ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white/90 backdrop-blur-sm"
              }`}
            >
              <img className="absolute w-14 h-14 right-[-1.5rem] top-0" src={discountImage} alt="Discount" />
              <h2 className="text-base font-bold text-red-500">🔥 Hot Deal</h2>
              <p className={`text-xs mt-1 ${dark ? "text-gray-400" : "text-gray-600"}`}>Up to 40% off today!</p>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className={`absolute bottom-8 right-0 z-20 shadow-xl rounded-2xl p-3 hidden sm:flex items-center gap-3 ${
                dark ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700" : "bg-white/90 backdrop-blur-sm"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">
                👨‍🍳
              </div>
              <div>
                <p className={`text-xs font-bold ${dark ? "text-white" : "text-gray-800"}`}>Chef's Special</p>
                <p className="text-xs text-yellow-500">★★★★★ 4.9</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Food slide */}
      <div className="max-w-6xl mx-auto mt-12 hidden md:block">
        <FoodSlide />
      </div>
    </section>
  );
}
