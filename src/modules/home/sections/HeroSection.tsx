"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background" />
      <Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" /> Now serving — fresh from the kitchen
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Discover food, <span className="text-primary">crafted with love</span>.
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            Order restaurant-grade meals, explore curated recipes, and read stories from food lovers — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/food">
                Browse menu <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/recipe/new">Explore recipes</Link>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-foreground">4.9</span> · 12k+ reviews
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="solar:bolt-linear" className="h-4 w-4 text-primary" /> 30-min delivery
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-square w-full max-w-md justify-self-center"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex h-full items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 via-orange-200/40 to-yellow-100/30 shadow-2xl">
            <Icon icon="solar:dish-bold-duotone" className="h-48 w-48 text-primary" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-lg"
          >
            <Icon icon="solar:medal-ribbon-bold-duotone" className="h-8 w-8 text-yellow-500" />
            <div className="text-xs">
              <p className="font-bold">Top rated</p>
              <p className="text-muted-foreground">in your city</p>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 top-12 flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-lg"
          >
            <Icon icon="solar:delivery-bold-duotone" className="h-8 w-8 text-primary" />
            <div className="text-xs">
              <p className="font-bold">30 min</p>
              <p className="text-muted-foreground">avg delivery</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
