import React, { useEffect, useRef } from "react";
import fastdelivery from "../../../../assets/img/home/fastdelivery.png";
import pickup from "../../../../assets/img/home/pickup.png";
import hotdeals from "../../../../assets/img/home/hotdeals.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    id: 1,
    imgSrc: hotdeals,
    altText: "Hot Deals & Offers",
    title: "Hot Deals & Offers",
    description: "We want to show you some love by giving you exclusive discounts on food at our restaurants.",
    accent: "from-orange-400 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-100 dark:border-orange-800/30",
  },
  {
    id: 2,
    imgSrc: pickup,
    altText: "Self Pick-Up",
    title: "Easy Self Pick-Up",
    description: "Skip the wait — place your order through the app and pick it up when it's ready.",
    accent: "from-violet-400 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-900/10",
    border: "border-violet-100 dark:border-violet-800/30",
  },
  {
    id: 3,
    imgSrc: fastdelivery,
    altText: "Fastest Delivery",
    title: "Lightning Delivery",
    description: "Choose your food and we'll deliver it at record speed. Every order, every time.",
    accent: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    border: "border-emerald-100 dark:border-emerald-800/30",
  },
];

const WhyRestOS = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: ".why-heading", start: "top 88%" },
        }
      );

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${dark ? "bg-gray-950" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="why-heading text-center mb-14 space-y-3">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
            Why choose us
          </span>
          <h2 className={`text-4xl font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">RestOS?</span>
          </h2>
          <p className={`max-w-md mx-auto text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            We blend technology with taste to bring you the most seamless food experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className={`group relative rounded-2xl border p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                dark
                  ? `bg-gray-900 border-gray-800 hover:border-gray-700`
                  : `bg-white border-gray-100 hover:border-gray-200 shadow-sm`
              }`}
            >
              {/* Gradient glow */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r ${reason.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${dark ? "bg-gray-800" : reason.bg}`}>
                <img src={reason.imgSrc} alt={reason.altText} className="w-9 h-9 object-contain" />
              </div>

              <h3 className={`text-lg font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>{reason.title}</h3>
              <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRestOS;
