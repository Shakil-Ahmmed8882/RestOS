"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Container } from "@/components/layouts/Container";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Foodie",
    image: "https://i.pravatar.cc/100?img=47",
    quote: "The flavor is unreal. I’ve ordered three times this week — RestOS is my new go-to.",
    rating: 5,
  },
  {
    name: "Daniel Lee",
    role: "Home cook",
    image: "https://i.pravatar.cc/100?img=12",
    quote: "Their recipe section actually inspires me to cook again. Beautifully crafted.",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    role: "Working pro",
    image: "https://i.pravatar.cc/100?img=32",
    quote: "Showed up hot, fast, and the packaging was gorgeous. 10/10.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Loved by food lovers</h2>
          <p className="mt-2 text-sm text-muted-foreground">Real stories from people who keep coming back.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="space-y-4 p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Icon key={j} icon="solar:star-bold" className="h-4 w-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarImage src={t.image} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
