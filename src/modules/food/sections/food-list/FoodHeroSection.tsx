"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layouts/Container";

gsap.registerPlugin(ScrollTrigger);

export function FoodHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        y: 50,
        opacity: 0.8,
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });

      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll(".stat-item");
        gsap.from(statElements, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        });

        statElements.forEach((stat, idx) => {
          const numberEl = stat.querySelector(".stat-number");
          if (numberEl && numberEl.textContent) {
            const finalValue = parseInt(numberEl.textContent.replace(/\D/g, ""));
            gsap.from(
              { value: 0 },
              {
                scrollTrigger: {
                  trigger: stat,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
                value: finalValue,
                duration: 1.2,
                delay: idx * 0.1,
                onUpdate: function() {
                  if (idx === 0 || idx === 2) {
                    (numberEl as HTMLElement).textContent = Math.floor(this.targets()[0].value).toLocaleString();
                  } else {
                    (numberEl as HTMLElement).textContent = this.targets()[0].value.toFixed(1);
                  }
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background/50 to-background py-16 md:py-24"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-orange-100/10 to-transparent"
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-5">
          <Icon icon="solar:dish-bold-duotone" className="h-96 w-96" />
        </div>
        <div className="absolute -left-32 bottom-0 opacity-3">
          <Icon icon="solar:chef-hat-bold-duotone" className="h-80 w-80" />
        </div>
        <div className="absolute right-10 top-1/3 opacity-3">
          <Icon icon="solar:leaf-bold-duotone" className="h-40 w-40 text-green-500" />
        </div>
      </div>

      <Container className="relative z-10">
        <div ref={contentRef} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
            <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
            <p className="text-xs font-medium text-muted-foreground">Premium Quality Meals</p>
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Find your next <span className="text-primary">favourite dish</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Hand-picked, restaurant-grade meals — searchable, filterable, and ready to deliver. Browse thousands of dishes from top restaurants in your area.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95">
              <Icon icon="solar:magnifer-linear" className="h-5 w-5" />
              Start Exploring
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-background px-6 py-3 font-semibold text-foreground transition-all hover:bg-accent">
              <Icon icon="solar:fire-bold" className="h-5 w-5 text-orange-500" />
              View Trending
            </button>
          </div>
        </div>

        <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <div className="stat-item rounded-lg border border-gray-200 dark:border-gray-800/50 bg-card/50 p-4 backdrop-blur-sm md:p-6">
            <Icon icon="solar:card-bold" className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Total Dishes</p>
            <p className="mt-1 text-2xl font-bold md:text-3xl">
              <span className="stat-number">1200</span>+
            </p>
          </div>

          <div className="stat-item rounded-lg border border-gray-200 dark:border-gray-800/50 bg-card/50 p-4 backdrop-blur-sm md:p-6">
            <Icon icon="solar:star-bold" className="h-5 w-5 text-yellow-500" />
            <p className="mt-2 text-sm text-muted-foreground">Avg Rating</p>
            <p className="mt-1 text-2xl font-bold md:text-3xl">
              <span className="stat-number">4.9</span>★
            </p>
          </div>

          <div className="stat-item rounded-lg border border-gray-200 dark:border-gray-800/50 bg-card/50 p-4 backdrop-blur-sm md:p-6">
            <Icon icon="solar:delivery-bold" className="h-5 w-5 text-blue-500" />
            <p className="mt-2 text-sm text-muted-foreground">Avg Delivery</p>
            <p className="mt-1 text-2xl font-bold md:text-3xl">
              <span className="stat-number">30</span> min
            </p>
          </div>

          <div className="stat-item rounded-lg border border-gray-200 dark:border-gray-800/50 bg-card/50 p-4 backdrop-blur-sm md:p-6">
            <Icon icon="solar:users-group-rounded-bold" className="h-5 w-5 text-green-500" />
            <p className="mt-2 text-sm text-muted-foreground">Happy Users</p>
            <p className="mt-1 text-2xl font-bold md:text-3xl">
              <span className="stat-number">50</span>k+
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
