import React, { useEffect, useRef } from "react";
import Container from "../../../../../shared/layouts/Container";
import man1 from "../../../../../assets/img/home/testimonials/man.jpg";
import women from "../../../../../assets/img/home/testimonials/women.jpg";
import women1 from "../../../../../assets/img/home/testimonials/w.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sirius Black",
    role: "Food Blogger",
    feedback: "RestOS is honestly the best food ordering experience I've ever had. The delivery was lightning fast and the food quality was exceptional.",
    rating: 5,
    image: women,
  },
  {
    id: 2,
    name: "John Doe",
    role: "Software Engineer",
    feedback: "I've tried many platforms, but RestOS stands out. The UI is clean, the menu is huge, and the deals are incredible. Highly recommend!",
    rating: 5,
    image: man1,
  },
  {
    id: 3,
    name: "Jane Smith",
    role: "Restaurant Manager",
    feedback: "As a restaurant partner, RestOS has been amazing for our business. The admin dashboard is intuitive and the order management is flawless.",
    rating: 4,
    image: women1,
  },
];

const Testimonial = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-heading",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: ".testimonial-heading", start: "top 88%" } }
      );
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".testimonial-card", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`py-20 ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Container>
        <div className="testimonial-heading text-center mb-12 space-y-3">
          <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${dark ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
            💬 Testimonials
          </span>
          <h2 className={`text-4xl font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>
            What Our Customers Say
          </h2>
          <p className={`max-w-md mx-auto text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Thousands of happy customers love RestOS. Here's what some of them have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`testimonial-card group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                dark
                  ? "bg-gray-950 border border-gray-800 hover:border-gray-700"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-lg"
              }`}
            >
              {/* Quote mark */}
              <span className={`text-5xl font-serif leading-none select-none ${dark ? "text-gray-800" : "text-gray-100"}`}>"</span>

              <p className={`text-sm leading-relaxed mt-1 mb-6 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                {t.feedback}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400/50"
                  />
                  <div>
                    <p className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>{t.name}</p>
                    <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < t.rating ? "text-yellow-400" : dark ? "text-gray-700" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
