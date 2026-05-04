import React, { useEffect, useRef } from "react";
import promofood1 from "../../../../../assets/img/demo-image/promofood1.png";
import promofood2 from "../../../../../assets/img/demo-image/promofood2.png";
import Container from "../../../../../shared/layouts/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function PromoSection() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = [card1.current, card2.current].filter(Boolean);
    const ctx = gsap.context(() => {
      cards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const cardBase = `relative h-80 rounded-2xl overflow-hidden flex p-8 group cursor-pointer`;

  return (
    <section className={`py-16 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Container className="grid md:grid-cols-2 gap-5">
        {/* Card 1 — Tropical */}
        <div
          ref={card1}
          className={`${cardBase} ${dark ? "bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-800/40" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}
        >
          <div className="z-10 flex flex-col justify-between h-full">
            <div>
              <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full ${dark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                🍓 Fruit
              </span>
              <h2 className={`text-3xl font-extrabold mt-3 leading-tight ${dark ? "text-white" : "text-blue-900"}`}>
                Tropical<br />Delight
              </h2>
              <p className={`mt-2 text-sm ${dark ? "text-blue-300" : "text-blue-700"}`}>
                Enjoy the sweetness with <span className="font-bold text-orange-500">50% Off</span> on all items.
              </p>
            </div>
            <Link
              to="/food"
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full w-fit transition-all duration-200 hover:scale-105 ${
                dark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              Shop Now →
            </Link>
          </div>
          <img
            src={promofood1}
            alt="Tropical"
            className="absolute right-0 bottom-0 h-64 object-contain group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700"
          />
        </div>

        {/* Card 2 — Vegetable */}
        <div
          ref={card2}
          className={`${cardBase} ${dark ? "bg-gradient-to-br from-emerald-900/60 to-green-900/60 border border-emerald-800/40" : "bg-gradient-to-br from-emerald-50 to-green-100"}`}
        >
          <div className="z-10 flex flex-col justify-between h-full">
            <div>
              <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full ${dark ? "bg-emerald-900/50 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}>
                🥦 Vegetable
              </span>
              <h2 className={`text-3xl font-extrabold mt-3 leading-tight ${dark ? "text-white" : "text-emerald-900"}`}>
                Green<br />World
              </h2>
              <p className={`mt-2 text-sm ${dark ? "text-emerald-300" : "text-emerald-700"}`}>
                Get <span className="font-bold text-orange-500">40% Off</span> on selected items.
              </p>
            </div>
            <Link
              to="/food"
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full w-fit transition-all duration-200 hover:scale-105 ${
                dark
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-emerald-700 text-white hover:bg-emerald-600"
              }`}
            >
              Shop Now →
            </Link>
          </div>
          <img
            src={promofood2}
            alt="Vegetables"
            className="absolute right-0 bottom-0 h-64 object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
          />
        </div>
      </Container>
    </section>
  );
}
