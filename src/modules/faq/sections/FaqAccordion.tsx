"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/modules/faq/data/faq.data";
import { Card } from "@/components/ui/card";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <Card key={item.question} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium">{item.question}</span>
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}
